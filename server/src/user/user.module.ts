import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AwsModule } from '../aws/aws.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, AwsModule],
  providers: [UserResolver, UserService, JwtService],
  exports: [UserService],
})
export class UserModule {}
