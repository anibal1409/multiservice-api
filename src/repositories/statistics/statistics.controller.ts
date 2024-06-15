// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// eslint-disable-next-line prettier/prettier
import {
  CountersRespondeDto,
  GetStatisticsDto,
  MonthRespondeDto,
} from './dto';
import { StatisticsService } from './statistics.service';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // @Post()
  // create(@Body() createStatisticDto: CreateStatisticDto) {
  //   return this.statisticsService.create(createStatisticDto);
  // }

  @Get('/counters')
  @ApiResponse({
    type: CountersRespondeDto,
  })
  counters() {
    return this.statisticsService.counters();
  }

  @Get('/month')
  @ApiResponse({
    type: MonthRespondeDto,
  })
  month(@Query() data: GetStatisticsDto) {
    console.log(data);
    return this.statisticsService.statisticsMonth(data);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.statisticsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStatisticDto: UpdateStatisticDto) {
  //   return this.statisticsService.update(+id, updateStatisticDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.statisticsService.remove(+id);
  // }
}
