import { ApiProperty } from '@nestjs/swagger';

export class ReservationRoomDTO {
  @ApiProperty()
  roomId: number;

  @ApiProperty()
  fromDate: Date;

  @ApiProperty()
  toDate: Date;
}
