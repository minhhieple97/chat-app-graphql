import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserService } from './user.service';
import { RequestWithUser } from 'src/auth/types';
import { MAX_IMAGE_SIZE } from 'src/config/constants';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @Request() req: RequestWithUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const updatedUser = await this.userService.updateAvatarFile(
      req.user.sub,
      file,
    );

    return {
      success: true,
      user: {
        id: updatedUser.id,
        avatarUrl: updatedUser.avatarUrl,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
      },
    };
  }
}
