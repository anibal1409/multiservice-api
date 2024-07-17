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

import { Order } from '../entities';
import { CreateOrderProductDto } from './create-order-product.dto';

export class OrderRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  deadline!: Date;

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
  @IsString()
  provider: string;

  @ApiProperty({ type: [CreateOrderProductDto] })
  @ArrayNotEmpty()
  @Type(() => CreateOrderProductDto)
  orderProducts: CreateOrderProductDto[];

  constructor(data: Order) {
    this.id = data.id;
    this.date = data.date;
    this.note = data.note;
    this.provider = data.provider;
    this.total = data.total;
    this.stage = data.stage;
    this.deadline = data.deadline;
    this.orderProducts = data.orderProducts as any;
  }
}
