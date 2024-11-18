import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [ChatroomService, ChatroomResolver, PrismaService],
})
export class ChatroomModule {}
