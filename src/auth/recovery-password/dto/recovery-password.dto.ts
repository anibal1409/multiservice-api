import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class RecoveryPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class RecoveryPasswordResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
