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

import { CrudRepository } from '../../common/use-case';
import { CategoryRespondeDto } from './dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities';

@Injectable()
export class CategoriesService implements CrudRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async findValid(id: number): Promise<Category> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: [],
    });
    if (!entity) {
      throw new NotFoundException('Categoría no encontrado');
    }
    return entity;
  }

  findByIdName(name: string, id?: number): Promise<Category> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateCategoryDto): Promise<CategoryRespondeDto> {
    if (await this.findByIdName(createDto.name)) {
      throw new BadRequestException('Categoría ya existe.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll() {
    return this.repository.find({
      where: {
        deleted: false,
      },
      order: {
        name: 'ASC',
      },
      relations: [],
    });
  }

  async findOne(id: number): Promise<CategoryRespondeDto> {
    const item = await this.findValid(id);
    return new CategoryRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateCategoryDto,
  ): Promise<CategoryRespondeDto> {
    if (await this.findByIdName(updateDto.name, id)) {
      throw new BadRequestException('Categoría ya existe.');
    }

    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto.description,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<CategoryRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new CategoryRespondeDto(await this.repository.save(item));
  }
}
