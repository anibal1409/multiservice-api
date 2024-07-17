import * as moment from 'moment';
import {
  Between,
  Repository,
} from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common/use-case';
import { ReportsService } from '../../reports/reports.service';
import { ProductsService } from '../products/products.service';
import {
  CreateOrderDto,
  GetOrdersDto,
  OrderRespondeDto,
  UpdateOrderDto,
} from './dto';
import {
  Order,
  OrderProduct,
} from './entities';
import {
  STAGE_ORDER_VALUE,
  StageOrder,
} from './enums';

@Injectable()
export class OrdersService implements CrudRepository<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly repositoryOrderProducts: Repository<OrderProduct>,
    private readonly reportsService: ReportsService,
    private readonly productsService: ProductsService,
  ) {}

  async findValid(id: number): Promise<Order> {
    if (!id) {
      throw new BadRequestException('ID null');
    }
    const entity = await this.repository.findOne({
      where: {
        id,
      },

      relations: ['orderProducts', 'orderProducts.product'],
    });
    if (!entity) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return entity;
  }

  async create(createDto: CreateOrderDto): Promise<OrderRespondeDto> {
    const item = await this.repository.save({
      ...createDto,
      deadline:
        !createDto.deadline && createDto.stage === StageOrder.Completed
          ? new Date()
          : createDto.deadline,
    });
    const ids: number[] = [];
    const orderProducts = createDto.orderProducts.map((orderProduct) => {
      ids.push(orderProduct.product.id);
      return {
        product: {
          id: orderProduct.product.id,
        },
        order: {
          id: item.id,
        },
        price: orderProduct.price,
        amount: orderProduct.amount,
        subtotal: orderProduct.subtotal,
      };
    });

    await this.repositoryOrderProducts.save(orderProducts);
    if (item.stage === StageOrder.Completed) {
      await this.updateProducts(ids, orderProducts);
    }

    return await this.findOne(item.id);
  }

  findAll(data?: GetOrdersDto) {
    const start = moment(data?.start)
      .startOf('day')
      .toDate();
    const end = moment(data?.end)
      .endOf('day')
      .toDate();

    return this.repository.find({
      where: {
        deleted: false,
        date: !!data?.start ? Between(start, end) : null,
        stage: data?.stage,
      },
      order: {
        date: data?.order || 'DESC',
      },
      relations: [
        'orderProducts',
        'orderProducts.product',
        'orderProducts.product.category',
      ],
    });
  }

  async findOne(id: number): Promise<OrderRespondeDto> {
    const item = await this.findValid(id);
    return new OrderRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateOrderDto,
  ): Promise<OrderRespondeDto> {
    const item = await this.findValid(id);
    const save = await this.repository.save({
      id,
      note: updateDto.note,
      total: updateDto.total,
      date: updateDto.date,
      stage: updateDto.stage,
      provider: updateDto.provider,
      deadline:
        !updateDto.deadline && updateDto.stage === StageOrder.Completed
          ? new Date()
          : updateDto.deadline,
    });

    const ids: number[] = [];

    const orderProducts = updateDto.orderProducts.map((orderProduct) => {
      ids.push(orderProduct.product.id);
      return {
        id: orderProduct.id,
        product: {
          id: orderProduct.product.id,
        },
        order: {
          id,
        },
        price: orderProduct.price,
        amount: orderProduct.amount,
        subtotal: orderProduct.subtotal,
      };
    });

    await this.repositoryOrderProducts.delete({
      order: {
        id,
      },
    });

    this.repositoryOrderProducts.save(orderProducts);
    if (
      save.stage === StageOrder.Completed &&
      item.stage !== StageOrder.Completed
    ) {
      await this.updateProducts(ids, orderProducts);
    }

    return this.findOne(save.id);
  }

  async remove(id: number): Promise<OrderRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    const ids: number[] = [];
    item.orderProducts.forEach((orderProduct) => {
      ids.push(orderProduct.product.id);
    });
    await this.updateProducts(ids, item.orderProducts, -1);
    return new OrderRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    const startMonth = moment().startOf('month').toDate();
    const endMonth = moment().endOf('month').toDate();
    return await this.repository.count({
      where: {
        deleted: false,
        createdAt: Between(startMonth, endMonth),
      },
    });
  }

  async generateMonthlyExamStatistics(data?: GetOrdersDto): Promise<
    {
      examName: string;
      count: number;
    }[]
  > {
    // Obtener estudios realizados en el mes y año especificados
    const studies = await this.findAll(data);
    console.log('generateMonthlyExamStatistics', studies);

    // Inicializar mapa para contar la cantidad de cada tipo de examen realizado
    const productCounts = new Map<string, number>();

    // Contar la cantidad de cada tipo de examen realizado
    await Promise.all(
      studies.map(async (order) => {
        await Promise.all(
          order.orderProducts.map(async (orderProduct) => {
            const productName = orderProduct.product.name;
            productCounts.set(
              productName,
              (productCounts.get(productName) || 0) + 1,
            );
          }),
        );
      }),
    );

    // Ordenar los tipos de examen por la cantidad de veces que se han realizado
    const sortedExamCounts = [...productCounts.entries()].sort(
      (a, b) => b[1] - a[1],
    );

    console.log(sortedExamCounts);

    // Convertir el mapa en un arreglo de objetos
    const examStatisticsArray = sortedExamCounts.map(([examName, count]) => ({
      examName,
      count,
    }));

    // Retorna los tipos de examen más realizados en el mes como un arreglo de objetos
    return examStatisticsArray;
  }

  async generateMonthlyExamTypeStatistics(
    data?: GetOrdersDto,
  ): Promise<{ examType: string; count: number }[]> {
    try {
      // Obtener estudios realizados en el mes y año especificados
      const studies = await this.findAll(data);

      // Inicializar un mapa para almacenar la cantidad de exámenes por tipo
      const examTypeCounts = new Map<string, number>();

      // Contar la cantidad de exámenes realizados por tipo
      await Promise.all(
        studies.map(async (study) => {
          await Promise.all(
            study.orderProducts.map(async (orderProduct) => {
              console.log(orderProduct.product);
              const examType = orderProduct.product?.category?.name;
              if (examType) {
                examTypeCounts.set(
                  examType,
                  (examTypeCounts.get(examType) || 0) + 1,
                );
              }
            }),
          );
        }),
      );

      // Convertir el mapa en un arreglo de objetos
      const examTypeStatisticsArray = Array.from(examTypeCounts.entries()).map(
        ([examType, count]) => ({
          examType,
          count,
        }),
      );

      // Retorna el arreglo con la cantidad de exámenes realizados por tipo
      return examTypeStatisticsArray;
    } catch (error) {
      // Manejar errores
      console.error('Error en generateMonthlyExamTypeStatistics:', error);
      throw error;
    }
  }

  async getPDF(id: number) {
    const item = await this.findOne(id);
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const orderProduct = item.orderProducts.map((orderProduct, i) => ({
      price: USDollar.format(+orderProduct.price),
      amount: orderProduct.amount,
      subtotal: USDollar.format(+orderProduct.subtotal),
      name: (orderProduct.product as any)?.name,
      index: i + 1,
      product: {
        ...orderProduct.product,
        price: USDollar.format(+orderProduct.price),
        amount: orderProduct.amount,
        subtotal: USDollar.format(+orderProduct.subtotal),
        index: i + 1,
      },
    }));
    item.total = USDollar.format(+item.total) as any;
    item.stage = STAGE_ORDER_VALUE[item.stage].name;

    return this.reportsService.generatePdfOrder(
      item.provider,
      item as any,
      orderProduct as any,
    );
  }

  async updateProducts(ids: number[], orderProducts: any[], type = 1) {
    let products = await this.productsService.findByIds(ids);
    products = products.map((product) => {
      const orderProduct: any = orderProducts.find(
        (orderProduct) => orderProduct.product.id === product.id,
      );
      return {
        ...product,
        // eslint-disable-next-line prettier/prettier
        stock: product.stock + ((+orderProduct?.amount || 0) * type),
      };
    });
    await this.productsService.saveMany(products);
  }
}
