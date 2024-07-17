import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  ArrayNotEmpty,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Customer } from '../../customers/entities';
import { Sale } from '../entities';
import { CreateSaleProductDto } from './create-sale-product.dto';

export class SaleRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Customer)
  customer: Customer;

  @ApiProperty({ type: [CreateSaleProductDto] })
  @ArrayNotEmpty()
  @Type(() => CreateSaleProductDto)
  saleProducts: CreateSaleProductDto[];

  constructor(data: Sale) {
    this.id = data.id;
    this.date = data.date;
    this.note = data.note;
    this.customer = data.customer;
    this.total = data.total;
    this.stage = data.stage;
    this.saleProducts = data.saleProducts as any;
  }
}
