import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { Order } from '../entities';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto extends PartialType(
  OmitType(Order, [
    'updatedAt',
    'createdAt',
    'deleted',
    'status',
    'orderProducts',
  ]),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deadline?: Date;

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
  @IsString()
  provider: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total!: number;

  @ApiProperty({ type: [CreateOrderProductDto] })
  @ArrayNotEmpty()
  @Type(() => CreateOrderProductDto)
  orderProducts: CreateOrderProductDto[];
}
