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
  GetServicesDto,
  ServiceRespondeDto,
} from './dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly examsService: ServicesService) {}

  @Post()
  @ApiResponse({
    type: ServiceRespondeDto,
  })
  create(@Body() createDto: CreateServiceDto) {
    return this.examsService.create(createDto);
  }

  @Get()
  @ApiResponse({
    type: ServiceRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetServicesDto) {
    return this.examsService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: ServiceRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ServiceRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceDto) {
    return this.examsService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ServiceRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }
}
