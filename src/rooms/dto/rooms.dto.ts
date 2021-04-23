import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class ListRoomsDTO {
  @ApiProperty()
  @IsDateString()
  fromDate: Date;

  @ApiProperty()
  @IsDateString()
  toDate: Date;
}
