import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Customer } from '../entities';

export class CustomerRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idDocument!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  constructor(data: Customer) {
    this.id = data.id;
    this.status = data.status;
    this.idDocument = data.idDocument;
    this.name = data.name;
    this.email = data.email;
    this.type = data.type;
    this.phone = data.phone;
  }
}
