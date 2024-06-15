import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReportsService } from './reports.service';

// @Public()
@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // @Post()
  // @ApiResponse({
  //   type: ReportsResponseDto,
  //   description: 'Retorna la url para acceder al reporte',
  // })
  // reports(@Body() reportDto: ReportsDto): Promise<ReportsResponseDto> {
  //   return this.reportsService.generateReport(reportDto);
  // }
}
