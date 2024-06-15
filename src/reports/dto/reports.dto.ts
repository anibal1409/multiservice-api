import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class ReportsDto {
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsArray()
  entitiesId: number[];

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsArray()
  platformsId: number[];

  // @ApiPropertyOptional()
  // @IsOptional()
  @ApiProperty()
  @IsString()
  dateRange: string;
}
