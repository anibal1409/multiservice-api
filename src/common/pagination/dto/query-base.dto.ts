import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class QueryBaseDto {
  term?: string;

  @Type(() => Number)
  page?: number;

  @Type(() => Number)
  size?: number;

  sort?: string;
  @ApiPropertyOptional({
    type: String,
    enum: ['ASC', 'DESC'],
  })
  order?: 'ASC' | 'DESC';
}
