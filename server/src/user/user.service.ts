import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AwsService } from '../aws/aws.service';
import { UpdateUserInput } from './dto';
import { User } from '@prisma/client';
import { MAX_IMAGE_SIZE } from 'src/config/constants';
import { AVATAR_FOLDER } from 'src/config/constants';
import * as Joi from 'joi';
import { FileUploadService } from 'src/common/services/file-upload.service';

type UserBasicInfo = Pick<
  User,
  'id' | 'fullname' | 'email' | 'avatarUrl' | 'createdAt'
>;

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private awsService: AwsService,
    private fileUploadService: FileUploadService,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, input: UpdateUserInput) {
    const user = await this.findById(id);

    if (input.email && input.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }

    let avatarUrl = user.avatarUrl;
    if (input.avatarData) {
      this.validateBase64Image(input.avatarData);
      avatarUrl = await this.uploadBase64ImageToS3(
        input.avatarData,
        AVATAR_FOLDER,
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...input,
        avatarUrl,
      },
    });

    return {
      user: updatedUser,
      success: true,
    };
  }

  async delete(id: number) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
    return { success: true, message: 'User deleted successfully' };
  }

  async updateAvatar(userId: number, base64Image: string): Promise<User> {
    this.validateBase64Image(base64Image);
    const avatarUrl = await this.uploadBase64ImageToS3(
      base64Image,
      AVATAR_FOLDER,
    );

    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });
  }

  private validateBase64Image(base64Image: string): void {
    const schema = Joi.string()
      .pattern(/^data:image\/\w+;base64,/)
      .max(MAX_IMAGE_SIZE)
      .required();

    const { error } = schema.validate(base64Image);
    if (error) {
      throw new BadRequestException(
        'Invalid base64 image or image size exceeds 5MB',
      );
    }
  }

  private async uploadBase64ImageToS3(
    base64Image: string,
    folder: string,
  ): Promise<string> {
    const buffer = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const key = `${folder}/${Date.now()}.jpg`;

    const uploadResult = await this.awsService.uploadFile(
      buffer,
      key,
      'image/jpeg',
    );
    return uploadResult;
  }

  searchUsers(searchTerm: string, userId: number): Promise<UserBasicInfo[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            fullname: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
        id: {
          not: userId, // Exclude current user
        },
      },
      orderBy: {
        fullname: 'asc',
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async getUsersOfChatroom(chatroomId: number): Promise<UserBasicInfo[]> {
    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
    });

    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    return this.prisma.user.findMany({
      where: {
        chatrooms: {
          some: {
            id: chatroomId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async getUser(
    userId: number,
  ): Promise<
    Pick<
      User,
      | 'id'
      | 'fullname'
      | 'email'
      | 'avatarUrl'
      | 'createdAt'
      | 'emailVerifiedAt'
    >
  > {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullname: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateAvatarFile(
    userId: number,
    file: Express.Multer.File,
  ): Promise<User> {
    const avatarUrl = await this.fileUploadService.uploadFile({
      file,
      folder: AVATAR_FOLDER,
      maxSizeInBytes: MAX_IMAGE_SIZE,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });
  }
}
