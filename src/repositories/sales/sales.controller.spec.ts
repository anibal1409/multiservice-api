import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Sale,
  SaleProduct,
} from './entities';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

describe('StudiesController', () => {
  let controller: SalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Sale, SaleProduct])],
      controllers: [SalesController],
      providers: [SalesService],
    }).compile();

    controller = module.get<SalesController>(SalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
