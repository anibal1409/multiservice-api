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
  GetServicesDto,
  ServiceRespondeDto,
} from './dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities';

@Injectable()
export class ServicesService implements CrudRepository<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {}

  async findValid(id: number): Promise<Service> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
    if (!entity) {
      throw new NotFoundException('Servicio no encontrado');
    }
    return entity;
  }

  findByIdName(name: string, id?: number): Promise<Service> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateServiceDto): Promise<ServiceRespondeDto> {
    console.log(createDto);
    if (await this.findByIdName(createDto.name)) {
      throw new BadRequestException('Servicio ya existe.');
    }

    const item = await this.repository.save({
      ...createDto,
      category: { id: createDto.category.id },
    });

    return await this.findOne(item.id);
  }

  findAll(data?: GetServicesDto) {
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

  async findOne(id: number): Promise<ServiceRespondeDto> {
    const item = await this.findValid(id);
    return new ServiceRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateServiceDto,
  ): Promise<ServiceRespondeDto> {
    console.log(updateDto);

    if (await this.findByIdName(updateDto.name, id)) {
      throw new BadRequestException('Servicio ya existe.');
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

  async remove(id: number): Promise<ServiceRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ServiceRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    return await this.repository.count({
      where: {
        deleted: false,
      },
    });
  }
}
