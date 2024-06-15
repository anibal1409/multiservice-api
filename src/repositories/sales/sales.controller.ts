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

import { ReportsResponseDto } from '../../reports/dto';
// eslint-disable-next-line prettier/prettier
import {
  GetSalesDto,
  StudyRespondeDto,
} from './dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-study.dto';
import { SalesService } from './sales.service';

@ApiTags('studies')
@Controller('studies')
export class SalesController {
  constructor(private readonly studiesService: SalesService) {}

  @Post()
  @ApiResponse({
    type: StudyRespondeDto,
  })
  create(@Body() createDto: CreateSaleDto) {
    return this.studiesService.create(createDto);
  }

  @Get()
  @ApiResponse({
    type: StudyRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetSalesDto) {
    return this.studiesService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: StudyRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.studiesService.findOne(+id);
  }

  // @Get(':id/pdf')
  // async generateStudyPDF(@Param('id') id: string, @Res() res: Response) {
  //   return this.studiesService.generatePDF(+id, res);
  // }

  @Get('resport/:id')
  @ApiResponse({
    type: ReportsResponseDto,
  })
  async generatePdf(@Param('id') id: string) {
    return await this.studiesService.getPDF(+id);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.send(pdfBuffer);
  }

  @Patch(':id')
  @ApiResponse({
    type: StudyRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateSaleDto) {
    return this.studiesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: StudyRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.studiesService.remove(+id);
  }
}
