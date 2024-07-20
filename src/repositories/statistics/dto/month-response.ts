// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class SaleGenderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  count: number;

  constructor(data: any) {
    this.name = data.name;
    this.count = data.count;
  }
}

export class MonthRespondeDto {

  @ApiProperty()
  @IsNotEmpty()
  categories: { [key: string]: number };

  @ApiProperty()
  @IsNotEmpty()
  products: { [key: string]: number };

  @ApiProperty()
  @IsNotEmpty()
  services: { [key: string]: number };

  // @ApiProperty({ type: SaleGenderDto, isArray: true })
  // @IsNotEmpty()
  // sales: SaleGenderDto[];

  constructor(data: any) {
    // this.sales = data.sales;
    this.categories = data.categories;
    this.products = data.products;
    this.services = data.services;
  }
}
