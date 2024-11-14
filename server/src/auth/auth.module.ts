import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenModule } from 'src/token/token.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [TokenModule, PrismaModule],
  providers: [AuthResolver, AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
