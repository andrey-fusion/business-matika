import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDTO {
  @ApiProperty()
  floor: number;

  @ApiProperty()
  number: number;
}
