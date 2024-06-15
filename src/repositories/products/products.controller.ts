import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// eslint-disable-next-line prettier/prettier
import {
  GetProductsDto,
  ProductRespondeDto,
} from './dto';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly examsService: ProductsService) {}

  @Post()
  @ApiResponse({
    type: ProductRespondeDto,
  })
  create(@Body() createDto: CreateProductDto) {
    return this.examsService.create(createDto);
  }

  @Get()
  @ApiResponse({
    type: ProductRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetProductsDto) {
    return this.examsService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: ProductRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ProductRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
    return this.examsService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ProductRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }
}
