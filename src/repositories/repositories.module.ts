import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { ServicesModule } from './services';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    UsersModule,
    CustomersModule,
    CategoriesModule,
    ProductsModule,
    SalesModule,
    StatisticsModule,
    OrdersModule,
    ServicesModule,
  ],
})
export class RepositoriesModule {}
