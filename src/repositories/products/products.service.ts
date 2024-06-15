// eslint-disable-next-line prettier/prettier
import {
  Not,
  Repository,
} from 'typeorm';

// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common';
// eslint-disable-next-line prettier/prettier
import {
  GetProductsDto,
  ProductRespondeDto,
} from './dto';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities';

@Injectable()
export class ProductsService implements CrudRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findValid(id: number): Promise<Product> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
    if (!entity) {
      throw new NotFoundException('Producto no encontrado');
    }
    return entity;
  }

  findByIdName(name: string, id?: number): Promise<Product> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateProductDto): Promise<ProductRespondeDto> {
    console.log(createDto);
    if (await this.findByIdName(createDto.name)) {
      throw new BadRequestException('Producto ya existe.');
    }

    const item = await this.repository.save({
      ...createDto,
      category: { id: createDto.category.id },
    });

    return await this.findOne(item.id);
  }

  findAll(data?: GetProductsDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: data?.status,
      },
      order: {
        name: 'ASC',
      },
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<ProductRespondeDto> {
    const item = await this.findValid(id);
    return new ProductRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateProductDto,
  ): Promise<ProductRespondeDto> {
    console.log(updateDto);

    if (await this.findByIdName(updateDto.name, id)) {
      throw new BadRequestException('Producto ya existe.');
    }

    const item = await this.repository.save({
      id,
      description: updateDto.description,
      name: updateDto.name,
      price: updateDto.price,
      status: updateDto.status,
      category: {
        id: updateDto.category.id,
      },
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ProductRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ProductRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    return await this.repository.count({
      where: {
        deleted: false,
      },
    });
  }
}
