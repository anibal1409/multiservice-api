import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currentPassword!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  confirmPassword!: string;
}
