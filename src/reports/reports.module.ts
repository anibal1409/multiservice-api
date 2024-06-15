import { Module } from '@nestjs/common';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
  imports: [],
  exports: [ReportsService],
})
export class ReportsModule {}
