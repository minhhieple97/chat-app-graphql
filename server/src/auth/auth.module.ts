import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenModule } from 'src/token/token.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [TokenModule, PrismaModule],
  providers: [AuthResolver, AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
