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

import { IdCreateEntity } from '../../base/id.create';
import { Sale } from '../entities';
import { CreateSaleProductDto } from './create-sale-product.dto';

export class CreateSaleDto extends PartialType(
  OmitType(Sale, [
    'updatedAt',
    'createdAt',
    'deleted',
    'customer',
    'status',
    'saleProducts',
  ]),
) {
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

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  customer: IdCreateEntity;

  @ApiProperty({ type: [CreateSaleProductDto] })
  @ArrayNotEmpty()
  @Type(() => CreateSaleProductDto)
  saleProducts: CreateSaleProductDto[];
}
