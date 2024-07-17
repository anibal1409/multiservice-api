import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ReportsResponseDto } from '../../reports/dto';
import { OrderRespondeDto } from './dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiResponse({
    type: OrderRespondeDto,
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({
    type: OrderRespondeDto,
    isArray: true,
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: OrderRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Get('resport/:id')
  @ApiResponse({
    type: ReportsResponseDto,
  })
  async generatePdf(@Param('id') id: string) {
    console.log('resport/:id');
    return await this.ordersService.getPDF(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: OrderRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: OrderRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
