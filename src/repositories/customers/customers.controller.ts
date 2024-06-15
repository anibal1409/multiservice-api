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

import { CustomersService } from './customers.service';
// eslint-disable-next-line prettier/prettier
import {
  CustomerRespondeDto,
  GetCustomersDto,
} from './dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly patientsService: CustomersService) {}

  @Post()
  @ApiResponse({
    type: CustomerRespondeDto,
  })
  create(@Body() createDto: CreateCustomerDto) {
    return this.patientsService.create(createDto);
  }

  @Get()
  @ApiResponse({
    type: CustomerRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetCustomersDto) {
    return this.patientsService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: CustomerRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Get('/document/:document')
  @ApiResponse({
    type: CustomerRespondeDto,
  })
  findOneByDocument(@Param('document') document: string) {
    return this.patientsService.findByIdDocument(document);
  }

  @Patch(':id')
  @ApiResponse({
    type: CustomerRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateCustomerDto) {
    return this.patientsService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: CustomerRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
