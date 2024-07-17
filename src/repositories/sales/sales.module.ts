import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsModule } from '../../reports/reports.module';
import { ProductsModule } from '../products';
// eslint-disable-next-line prettier/prettier
import {
  Sale,
  SaleProduct,
} from './entities';
import { SaleService } from './entities/saleService.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleProduct, SaleService]),
    ReportsModule,
    ProductsModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
