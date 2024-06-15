// eslint-disable-next-line prettier/prettier
import { IsNumber } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class IdCreateEntity {
  @ApiPropertyOptional()
  @IsNumber()
  id!: number;
}
