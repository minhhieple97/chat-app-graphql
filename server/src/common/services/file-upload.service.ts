import { Injectable, BadRequestException } from '@nestjs/common';
import { AwsService } from '../../aws/aws.service';
import { AVATAR_FOLDER, MAX_IMAGE_SIZE } from 'src/config/constants';

type UploadFileOptions = {
  file: Express.Multer.File;
  folder?: string;
  maxSizeInBytes?: number;
  allowedMimeTypes?: string[];
};

@Injectable()
export class FileUploadService {
  private readonly DEFAULT_MAX_SIZE = MAX_IMAGE_SIZE;
  private readonly DEFAULT_ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  constructor(private readonly awsService: AwsService) {}

  async uploadFile({
    file,
    folder = AVATAR_FOLDER,
    maxSizeInBytes = this.DEFAULT_MAX_SIZE,
    allowedMimeTypes = this.DEFAULT_ALLOWED_TYPES,
  }: UploadFileOptions): Promise<string> {
    this.validateFile(file, maxSizeInBytes, allowedMimeTypes);

    const key = this.generateFileKey(file, folder);

    return this.awsService.uploadFile(file.buffer, key, file.mimetype);
  }

  private validateFile(
    file: Express.Multer.File,
    maxSize: number,
    allowedTypes: string[],
  ): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`,
      );
    }

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${
          file.mimetype
        } is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
      );
    }
  }

  private generateFileKey(file: Express.Multer.File, folder: string): string {
    const fileExtension = file.originalname.split('.').pop();
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${folder}/${timestamp}-${randomString}.${fileExtension}`;
  }
}
