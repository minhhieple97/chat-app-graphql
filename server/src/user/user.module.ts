import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AwsModule } from '../aws/aws.module';
import { JwtService } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule, AwsModule, TokenModule],
  providers: [
    UserResolver,
    UserService,
    JwtService,
    TokenService,
    FileUploadService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
