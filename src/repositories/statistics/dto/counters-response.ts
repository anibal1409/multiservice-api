import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Counters } from '../entities';

export class CountersRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  patients: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  users: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  studies: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  exams: number;

  constructor(data: Counters) {
    this.exams = data.exams;
    this.patients = data.patients;
    this.studies = data.studies;
    this.users = data.users;
  }
}
