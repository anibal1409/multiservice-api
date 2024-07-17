import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsNotEmpty,
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
import { Product } from '../entities';

export class CreateProductDto extends PartialType(
  OmitType(Product, ['updatedAt', 'createdAt', 'deleted', 'category']),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  category: IdCreateEntity;
}
