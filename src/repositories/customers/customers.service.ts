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
import { GetCustomersDto } from './dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerRespondeDto } from './dto/customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities';

@Injectable()
export class CustomersService implements CrudRepository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async findValid(id: number): Promise<Customer> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: [],
    });
    if (!entity) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return entity;
  }

  findByIdDocument(idDocument: string, id?: number): Promise<Customer> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        idDocument,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateCustomerDto): Promise<CustomerRespondeDto> {
    if (await this.findByIdDocument(createDto.idDocument)) {
      throw new BadRequestException('Cliente ya existe.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll(data?: GetCustomersDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: data?.status,
      },
      order: {
        name: 'ASC',
      },
      relations: [],
    });
  }

  async findOne(id: number): Promise<CustomerRespondeDto> {
    const item = await this.findValid(id);
    return new CustomerRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateCustomerDto,
  ): Promise<CustomerRespondeDto> {
    if (await this.findByIdDocument(updateDto.idDocument, id)) {
      throw new BadRequestException('Cliente ya existe.');
    }

    const item = await this.repository.save({
      id,
      idDocument: updateDto.idDocument,
      name: updateDto.name,
      status: updateDto.status,
      email: updateDto.email,
      phone: updateDto.phone,
      type: updateDto.type,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<CustomerRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new CustomerRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    return await this.repository.count({
      where: {
        deleted: false,
      },
    });
  }
}
