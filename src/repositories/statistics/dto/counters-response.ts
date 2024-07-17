import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Counters } from '../entities';

export class CountersRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  customers: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  users: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  sales: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  products: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  orders: number;

  constructor(data: Counters) {
    this.products = data.products;
    this.customers = data.customers;
    this.sales = data.sales;
    this.users = data.users;
    this.orders = data.orders;
  }
}
