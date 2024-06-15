import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class ChangePasswordResponseDto {
  @ApiProperty()
  @IsString()
  message: string;
}
