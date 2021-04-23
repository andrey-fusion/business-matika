import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Room, Prisma, Reservation } from '@prisma/client';
import { ListRoomsDTO } from './dto/rooms.dto';

const dateFilter = (fromDate, toDate) => ({
  OR: [
    {
      fromDate: {
        gte: new Date(fromDate),
        lte: new Date(toDate),
      },
    },
    {
      toDate: {
        lte: new Date(toDate),
        gte: new Date(fromDate),
      },
    },
  ],
});

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async room(
    roomWhereUniqueInput: Prisma.RoomWhereInput,
  ): Promise<Room | null> {
    return this.prisma.room.findFirst({
      where: roomWhereUniqueInput,
    });
  }

  async rooms(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoomWhereUniqueInput;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByInput;
    select?: Prisma.RoomSelect;
  }): Promise<Room[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.room.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async freeRooms({ fromDate, toDate }: ListRoomsDTO) {
    const reservations = await this.prisma.reservation.findMany({
      where: {
        ...dateFilter(fromDate, toDate),
      },
      select: {
        roomId: true,
      },
    });
    return this.rooms({
      where: {
        id: {
          notIn: reservations.map(({ roomId }) => roomId),
        },
      },
    });
  }

  async reservationRoom(
    data: Prisma.ReservationCreateInput,
  ): Promise<Reservation> {
    const alreadyReserved = await this.prisma.reservation.findFirst({
      where: {
        roomId: data.roomId,
        ...dateFilter(data.fromDate, data.toDate),
      },
    });
    if (alreadyReserved) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Room already reserved',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.reservation.create({
      data,
    });
  }

  async createRoom(data: Prisma.RoomCreateInput): Promise<Room> {
    const existRoom = await this.room(data);
    if (existRoom) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Room already exist',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.room.create({
      data,
    });
  }

  async updateRoom(params: {
    where: Prisma.RoomWhereUniqueInput;
    data: Prisma.RoomUpdateInput;
  }): Promise<Room> {
    const { where, data } = params;
    return this.prisma.room.update({
      data,
      where,
    });
  }

  async deleteRoom(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
    return this.prisma.room.delete({
      where,
    });
  }
}
