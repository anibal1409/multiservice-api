import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';

import { IdCreateEntity } from '../../base/id.create';

export class CreateSaleProductDto extends IdCreateEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  product: IdCreateEntity;
}
