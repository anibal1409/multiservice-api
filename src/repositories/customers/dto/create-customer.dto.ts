// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { Customer } from '../entities';

export class CreateCustomerDto extends PartialType(
  OmitType(Customer, ['updatedAt', 'createdAt', 'deleted']),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idDocument!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email!: string;
}
