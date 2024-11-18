import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { AwsService } from 'src/aws/aws.service';
import { TokenService } from 'src/token/token.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [PrismaModule, UserModule, TokenModule],
  providers: [
    ChatroomService,
    ChatroomResolver,
    PrismaService,
    UserService,
    FileUploadService,
    AwsService,
    TokenService,
  ],
})
export class ChatroomModule {}
