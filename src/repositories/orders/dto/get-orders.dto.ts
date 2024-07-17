import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBooleanString,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetOrdersDto {
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
  provider?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  start: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  end: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';
}
