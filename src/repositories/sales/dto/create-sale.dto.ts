import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
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
import { StageStudy } from '../enums';
import { CreateSaleProductDto } from './create-sale-product.dto';
import { CreateSaleServiceDto } from './create-sale-service.dto';

export class CreateSaleDto extends PartialType(
  OmitType(Sale, [
    'updatedAt',
    'createdAt',
    'deleted',
    'customer',
    'status',
    'saleServices',
    'saleProducts',
  ]),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stage!: StageStudy;

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
  @IsBoolean()
  sendEmail!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total!: number;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  customer: IdCreateEntity;

  @ApiProperty({ type: [CreateSaleServiceDto] })
  @ArrayNotEmpty()
  @Type(() => CreateSaleServiceDto)
  saleServices: CreateSaleServiceDto[];

  @ApiProperty({ type: [CreateSaleProductDto] })
  @ArrayNotEmpty()
  @Type(() => CreateSaleProductDto)
  saleProducts: CreateSaleProductDto[];
}
