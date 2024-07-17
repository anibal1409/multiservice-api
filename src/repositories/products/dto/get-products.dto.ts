import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBooleanString,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  status?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  stock?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  moreOrequal?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  lessOrEqual?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;
}
