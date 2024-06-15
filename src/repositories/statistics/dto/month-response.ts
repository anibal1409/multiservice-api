// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class SaleDto {
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
  category: { [key: string]: number };

  @ApiProperty({ type: SaleDto, isArray: true })
  @IsNotEmpty()
  sales: SaleDto[];

  constructor(data: any) {
    this.sales = data.sales;
    this.category = data.category;
  }
}
