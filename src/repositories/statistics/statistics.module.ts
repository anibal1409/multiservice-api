import { Module } from '@nestjs/common';

import { CustomersModule } from '../customers';
import { ProductsModule } from '../products';
import { SalesModule } from '../sales';
import { UsersModule } from '../users';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [UsersModule, CustomersModule, SalesModule, ProductsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
