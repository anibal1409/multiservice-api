import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ReportsResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reportUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  // @ApiProperty()
  // buffer: any;
}
