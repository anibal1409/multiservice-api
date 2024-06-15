import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReportsResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reportUrl: string;
}
