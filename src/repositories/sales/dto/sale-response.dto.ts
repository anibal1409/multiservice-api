import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  ArrayNotEmpty,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Customer } from '../../customers/entities';
import { Sale } from '../entities';
import { StageStudy } from '../enums';
import { CreateSaleProductDto } from './create-sale-product.dto';
import { CreateSaleServiceDto } from './create-sale-service.dto';

export class StudyRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

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

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Customer)
  patient: Customer;

  @ApiProperty({ type: [CreateSaleServiceDto] })
  @ArrayNotEmpty()
  @Type(() => CreateSaleServiceDto)
  saleProducts: CreateSaleServiceDto[];

  @ApiProperty({ type: [CreateSaleProductDto] })
  @ArrayNotEmpty()
  @Type(() => CreateSaleProductDto)
  saleServices: CreateSaleProductDto[];

  constructor(data: Sale) {
    this.id = data.id;
    this.stage = data.stage as StageStudy;
    this.date = data.date;
    this.note = data.note;
    this.sendEmail = data.sendEmail;
    this.patient = data.customer;
    this.total = data.total;
    this.saleProducts = data.saleProducts as any;
    this.saleServices = data.saleServices as any;
  }
}
