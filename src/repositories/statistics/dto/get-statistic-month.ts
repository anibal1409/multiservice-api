// eslint-disable-next-line prettier/prettier
import {
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetStatisticsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end: string;
}
