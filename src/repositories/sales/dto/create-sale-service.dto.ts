import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';

import { IdCreateEntity } from '../../base/id.create';

export class CreateSaleServiceDto extends IdCreateEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: string;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  service: IdCreateEntity;
}
