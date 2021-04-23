import { Reservation, Room } from '.prisma/client';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRoomDTO } from './dto/room.dto';
import { ListRoomsDTO } from './dto/rooms.dto';
import { ReservationRoomDTO } from './dto/rooms.reservation.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Get()
  getAllRooms(): Promise<Room[]> {
    return this.roomService.rooms({});
  }

  @Post()
  createRoom(@Body() createRoomDTO: CreateRoomDTO): Promise<Room> {
    return this.roomService.createRoom(createRoomDTO);
  }

  @Get('free')
  getFreeRooms(@Query() query: ListRoomsDTO): Promise<Room[]> {
    return this.roomService.freeRooms(query);
  }

  @Post('reservation')
  reservationRoom(
    @Body() reservationRoomDTO: ReservationRoomDTO,
  ): Promise<Reservation> {
    return this.roomService.reservationRoom(reservationRoomDTO);
  }
}
