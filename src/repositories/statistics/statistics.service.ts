import { Injectable } from '@nestjs/common';

import { CustomersService } from '../customers/customers.service';
import { OrdersService } from '../orders';
import { ProductsService } from '../products';
import { SalesService } from '../sales';
import { ServicesService } from '../services';
import { UsersService } from '../users/users.service';
// eslint-disable-next-line prettier/prettier
import {
  CountersRespondeDto,
  GetStatisticsDto,
  MonthRespondeDto,
} from './dto';
import { Counters } from './entities';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    private readonly salesService: SalesService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly servicesService: ServicesService,
  ) {}

  async counters(): Promise<CountersRespondeDto> {
    const counters = await this.getCounters();
    return new CountersRespondeDto(counters);
  }

  private async getCounters(): Promise<Counters> {
    return {
      customers: await this.customersService.count(),
      users: await this.usersService.count(),
      sales: await this.salesService.count(),
      products: await this.productsService.count(),
      orders: await this.ordersService.count(),
      services: await this.servicesService.count(),
    };
  }

  async statisticsMonth(data: GetStatisticsDto): Promise<MonthRespondeDto> {
    return new MonthRespondeDto({
      categories: await this.salesService.generateMonthlyCategoriesStatistics(data),
      products: await this.salesService.generateMonthlySaleStatistics(data),
      services: await this.salesService.generateMonthlySaleServicesStatistics(data),
    });
  }
}
