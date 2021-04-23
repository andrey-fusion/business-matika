import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, RoomsController],
  providers: [AppService, RoomsService, PrismaService],
})
export class AppModule {}
