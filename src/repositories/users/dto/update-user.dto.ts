// eslint-disable-next-line prettier/prettier
import {
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';

import { UserRole } from '../enums';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role!: UserRole;
}
