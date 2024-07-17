import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Category } from '../../categories/entities';
import { Product } from '../entities';

export class ProductRespondeDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  path?: string;

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
  @Type(() => Category)
  category: Category;

  constructor(data: Product) {
    this.id = data.id;
    this.status = data.status;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.path = data?.path;
    this.stock = data.stock;
    this.category = data.category;
  }
}
