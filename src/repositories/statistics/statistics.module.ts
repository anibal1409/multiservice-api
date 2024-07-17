import { Module } from '@nestjs/common';

import { CustomersModule } from '../customers';
import { OrdersModule } from '../orders';
import { ProductsModule } from '../products';
import { SalesModule } from '../sales';
import { UsersModule } from '../users';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    SalesModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
