import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CategoryRespondeDto } from './dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({
    type: CategoryRespondeDto,
  })
  create(@Body() createDto: CreateCategoryDto) {
    return this.CategoriesService.create(createDto);
  }

  @Get()
  @ApiResponse({
    type: CategoryRespondeDto,
    isArray: true,
  })
  findAll() {
    return this.CategoriesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: CategoryRespondeDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.CategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: CategoryRespondeDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return this.CategoriesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: CategoryRespondeDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.CategoriesService.remove(+id);
  }
}
