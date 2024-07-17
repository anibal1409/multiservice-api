import * as moment from 'moment';
// eslint-disable-next-line prettier/prettier
import {
  Between,
  In,
  Repository,
} from 'typeorm';

// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CrudRepository,
  formatNumberToDigits,
} from '../../common';
import { ReportsService } from '../../reports/reports.service';
import { ProductsService } from '../products/products.service';
// eslint-disable-next-line prettier/prettier
import {
  GetSalesDto,
  SaleRespondeDto,
} from './dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-study.dto';
// eslint-disable-next-line prettier/prettier
import {
  Sale,
  SaleProduct,
} from './entities';
import {
  STAGE_STATISTICS,
  STAGE_STUDY_VALUE,
  StageSale,
} from './enums';

@Injectable()
export class SalesService implements CrudRepository<Sale> {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: Repository<Sale>,
    @InjectRepository(SaleProduct)
    private readonly repositorySaleProducts: Repository<SaleProduct>,
    private readonly reportsService: ReportsService,
    private readonly productsService: ProductsService,
  ) {}

  async findValid(id: number): Promise<Sale> {
    if (!id) {
      throw new BadRequestException('ID null');
    }
    const entity = await this.repository.findOne({
      where: {
        id,
      },

      relations: ['customer', 'saleProducts', 'saleProducts.product'],
    });
    if (!entity) {
      throw new NotFoundException('Venta no encontrada');
    }
    return entity;
  }

  async create(createDto: CreateSaleDto): Promise<SaleRespondeDto> {
    const item = await this.repository.save(createDto);
    const ids: number[] = [];
    const saleProducts = createDto.saleProducts.map((saleProduct) => {
      ids.push(saleProduct.product.id);
      return {
        product: {
          id: saleProduct.product.id,
        },
        sale: {
          id: item.id,
        },
        price: saleProduct.price,
        amount: saleProduct.amount,
        subtotal: saleProduct.subtotal,
      };
    });

    await this.repositorySaleProducts.save(saleProducts);
    if (![StageSale.Cancelled].includes(item.stage as any)) {
      await this.updateProductsCreate(ids, saleProducts);
    }

    return await this.findOne(item.id);
  }

  findAll(data?: GetSalesDto) {
    const start = moment(data?.start)
      .startOf('day')
      .toDate();
    const end = moment(data?.end)
      .endOf('day')
      .toDate();

    return this.repository.find({
      where: {
        deleted: false,
        customer: {
          id: data?.customerId,
        },
        date: !!data?.start ? Between(start, end) : null,
        stage: data?.stage,
      },
      order: {
        date: data?.order || 'DESC',
      },
      relations: [
        'customer',
        'saleProducts',
        'saleProducts.product',
        'saleProducts.product.category',
      ],
    });
  }

  async findOne(id: number): Promise<SaleRespondeDto> {
    const item = await this.findValid(id);
    return new SaleRespondeDto(item);
  }

  async update(id: number, updateDto: UpdateSaleDto): Promise<SaleRespondeDto> {
    const item = await this.findValid(id);
    const save = await this.repository.save({
      id,
      note: updateDto.note,
      customer: {
        id: updateDto.customer.id,
      },
      total: updateDto.total,
      date: updateDto.date,
      stage: updateDto.stage,
    });

    const ids: number[] = [];
    item.saleProducts.forEach((saleProduct) => {
      ids.push(saleProduct.product.id);
    });

    const salesProducts = updateDto.saleProducts.map((saleProduct) => {
      ids.push(saleProduct.product.id);
      return {
        id: saleProduct.id,
        product: {
          id: saleProduct.product.id,
        },
        sale: {
          id,
        },
        price: saleProduct.price,
        amount: saleProduct.amount,
        subtotal: saleProduct.subtotal,
      };
    });

    await this.repositorySaleProducts.delete({
      sale: {
        id,
      },
    });

    this.repositorySaleProducts.save(salesProducts);
    await this.updateProductsUpdate(
      ids,
      item.saleProducts,
      salesProducts,
      item.stage as any,
    );

    return this.findOne(save.id);
  }

  async remove(id: number): Promise<SaleRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;

    const ids: number[] = [];
    item.saleProducts.forEach((saleProduct) => {
      ids.push(saleProduct.product.id);
    });
    await this.updateProductsUpdate(
      ids,
      item.saleProducts,
      item.saleProducts,
      StageSale.Cancelled,
    );
    return new SaleRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    const startMonth = moment().startOf('month').toDate();
    const endMonth = moment().endOf('month').toDate();
    return await this.repository.count({
      where: {
        deleted: false,
        date: Between(startMonth, endMonth),
        stage: In(STAGE_STATISTICS),
      },
    });
  }

  async generateMonthlySaleStatistics(data?: GetSalesDto): Promise<
    {
      productName: string;
      count: number;
    }[]
  > {
    // Obtener estudios realizados en el mes y año especificados
    const sales = await this.findAll(data);
    console.log('generateMonthlyExamStatistics', sales);

    // Inicializar mapa para contar la cantidad de cada tipo de examen realizado
    const productsCounts = new Map<string, number>();

    // Contar la cantidad de cada tipo de examen realizado
    await Promise.all(
      sales.map(async (sale) => {
        if (STAGE_STATISTICS.includes(sale.stage as any)) {
          await Promise.all(
            sale.saleProducts.map(async (saleProduct) => {
              const productName = saleProduct.product.name;
              productsCounts.set(
                productName,
                (productsCounts.get(productName) || 0) + +saleProduct.amount,
              );
            }),
          );
        }
      }),
    );

    // Ordenar los tipos de examen por la cantidad de veces que se han realizado
    const sortedProductsCounts = [...productsCounts.entries()].sort(
      (a, b) => b[1] - a[1],
    );

    console.log(sortedProductsCounts);

    // Convertir el mapa en un arreglo de objetos
    const productStatisticsArray = sortedProductsCounts.map(
      ([productName, count]) => ({
        productName,
        count,
      }),
    );

    // Retorna los tipos de examen más realizados en el mes como un arreglo de objetos
    return productStatisticsArray;
  }

  async generateMonthlyCategoriesStatistics(
    data?: GetSalesDto,
  ): Promise<{ category: string; count: number }[]> {
    try {
      // Obtener estudios realizados en el mes y año especificados
      const sales = await this.findAll(data);

      // Inicializar un mapa para almacenar la cantidad de exámenes por tipo
      const categoryCounts = new Map<string, number>();

      // Contar la cantidad de exámenes realizados por tipo
      await Promise.all(
        sales.map(async (sale) => {
          if (STAGE_STATISTICS.includes(sale.stage as any)) {
            await Promise.all(
              sale.saleProducts.map(async (saleProduct) => {
                const category = saleProduct.product?.category?.name;
                if (category) {
                  categoryCounts.set(
                    category,
                    (categoryCounts.get(category) || 0) + +saleProduct.amount,
                  );
                }
              }),
            );
          }
        }),
      );

      // Convertir el mapa en un arreglo de objetos
      const categoryStatisticsArray = Array.from(categoryCounts.entries()).map(
        ([category, count]) => ({
          category,
          count,
        }),
      );

      // Retorna el arreglo con la cantidad de exámenes realizados por tipo
      return categoryStatisticsArray;
    } catch (error) {
      // Manejar errores
      console.error('Error en generateMonthlyExamTypeStatistics:', error);
      throw error;
    }
  }

  async getPDF(id: number) {
    const item = await this.findOne(id);
    const item2 = { ...item };
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const saleProducts = item.saleProducts.map((saleProduct, i) => ({
      price: USDollar.format(+saleProduct.price),
      amount: saleProduct.amount,
      subtotal: USDollar.format(+saleProduct.subtotal),
      name: (saleProduct.product as any)?.name,
      index: i + 1,
      product: {
        ...saleProduct.product,
        price: USDollar.format(+saleProduct.price),
        amount: saleProduct.amount,
        subtotal: USDollar.format(+saleProduct.subtotal),
        index: i + 1,
      },
    }));
    item.total = USDollar.format(+item.total) as any;

    return this.reportsService
      .generatePdfSale(item.customer, item as any, saleProducts as any)
      .finally(() => {
        item2.stage = StageSale.Printed;
        this.update(id, item2);
      });
  }

  async getReportSales(data: GetSalesDto) {
    let sales = await this.findAll({ ...data, order: 'ASC' });
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    sales = sales?.map((sale, index) => ({
      index: index + 1,
      totalF: USDollar.format(+sale.total),
      date: moment(sale.date).format('DD/MM/YYYY HH:mm'),
      stage: STAGE_STUDY_VALUE[sale.stage].name,
      total: sale.total,
      code: formatNumberToDigits(sale.id),
      products: sale.saleProducts?.reduce(
        (accumulator: number, currentValue: SaleProduct) =>
          accumulator + +currentValue.amount,
        0,
      ),
    })) as any;
    const total = sales?.reduce(
      (accumulator: number, currentValue: Sale) =>
        accumulator + +currentValue.total,
      0,
    );
    return this.reportsService.generateReport(
      sales,
      USDollar.format(+total),
      data.start,
      data.end,
    );
  }

  async updateProductsCreate(ids: number[], saleProducts: any[]) {
    let products = await this.productsService.findByIds(ids);
    products = products.map((product) => {
      const saleProduct: any = saleProducts.find(
        (saleProduct) => saleProduct.product.id === product.id,
      );
      return {
        ...product,
        stock: product.stock - (saleProduct?.amount || 0),
      };
    });
    await this.productsService.saveMany(products);
  }

  async updateProductsUpdate(
    ids: number[],
    oldSaleProducts: any[],
    newSaleProducts: any[],
    stage: StageSale,
  ) {
    let products = await this.productsService.findByIds(ids);

    products = products.map((product) => {
      const saleProduct: any = oldSaleProducts.find(
        (saleProduct) => saleProduct.product.id === product.id,
      );
      return {
        ...product,
        stock: product.stock + (+saleProduct?.amount || 0),
      };
    });

    if (![StageSale.Cancelled].includes(stage)) {
      products = products.map((product) => {
        const saleProduct: any = newSaleProducts.find(
          (saleProduct) => saleProduct.product.id === product.id,
        );
        return {
          ...product,
          stock: product.stock - (+saleProduct?.amount || 0),
        };
      });
    }

    await this.productsService.saveMany(products);
  }
}
