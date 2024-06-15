import * as moment from 'moment';
// eslint-disable-next-line prettier/prettier
import {
  Between,
  In,
  Repository,
} from 'typeorm';

// eslint-disable-next-line prettier/prettier
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common';
import { ReportsService } from '../../reports/reports.service';
// eslint-disable-next-line prettier/prettier
import {
  GetSalesDto,
  StudyRespondeDto,
} from './dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-study.dto';
// eslint-disable-next-line prettier/prettier
import {
  Sale,
  SaleProduct,
} from './entities';
import { StageStudy } from './enums';

@Injectable()
export class SalesService implements CrudRepository<Sale> {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: Repository<Sale>,
    @InjectRepository(SaleProduct)
    private readonly repositoryStudyExams: Repository<SaleProduct>,
    private readonly reportsService: ReportsService,
  ) {}

  async findValid(id: number): Promise<Sale> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },

      relations: [
        'customer',
        'saleProduct',
        'saleProduct.product',
        'saleService',
        'saleService.service',
      ],
    });
    if (!entity) {
      throw new NotFoundException('Estudio no encontrado');
    }
    return entity;
  }

  async create(createDto: CreateSaleDto): Promise<StudyRespondeDto> {
    console.log('createDto', createDto);
    const item = await this.repository.save(createDto);
    // const studyExams = createDto.studyExams.map((studyExam) => {
    //   return {
    //     exam: {
    //       id: studyExam.exam.id,
    //     },
    //     study: {
    //       id: item.id,
    //     },
    //     value: studyExam.value,
    //   };
    // });

    // await this.repositoryStudyExams.save(studyExams);

    return await this.findOne(item.id);
  }

  findAll(data?: GetSalesDto) {
    const start = moment(data?.start)
      .startOf('day')
      .toDate();
    const end = moment(data?.end)
      .startOf('day')
      .toDate();

    return this.repository.find({
      where: {
        deleted: false,
        stage: data?.stage,
        customer: {
          id: data?.customerId,
        },
        date: !!data?.start ? Between(start, end) : null,
      },
      order: {
        date: 'DESC',
      },
      relations: [
        'customer',
        'saleProduct',
        'saleProduct.product',
        'saleProduct.product.category',
        'saleService',
        'saleService.service',
        'saleService.service.category',
      ],
    });
  }

  async findOne(id: number): Promise<StudyRespondeDto> {
    const item = await this.findValid(id);
    console.log(item);
    
    return new StudyRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateSaleDto,
  ): Promise<StudyRespondeDto> {
    const item = await this.repository.save({
      id,
      note: updateDto.note,
      customer: {
        id: updateDto.customer.id,
      },
      sendEmail: updateDto.sendEmail,
      stage: updateDto.stage,
      total: updateDto.total,
      date: updateDto.date,
    });

    // const studyExams = updateDto.studyExams.map((studyExam) => {
    //   return {
    //     id: studyExam.id,
    //     exam: {
    //       id: studyExam.exam.id,
    //     },
    //     study: {
    //       id,
    //     },
    //     value: studyExam.value,
    //   };
    // });

    // this.repositoryStudyExams.save(studyExams);

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<StudyRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new StudyRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    const startMonth = moment().startOf('month').toDate();
    const endMonth = moment().endOf('month').toDate();
    return await this.repository.count({
      where: {
        deleted: false,
        stage: In([
          StageStudy.Delivered,
          StageStudy.Downloaded,
          StageStudy.Printed,
          StageStudy.Sent,
        ]),
        date: Between(startMonth, endMonth),
      },
    });
  }

  async generateMonthlyExamStatistics(data?: GetSalesDto): Promise<
    {
      examName: string;
      count: number;
    }[]
  > {
    // Obtener estudios realizados en el mes y año especificados
    const studies = await this.findAll(data);
    console.log('generateMonthlyExamStatistics', studies);

    // Inicializar mapa para contar la cantidad de cada tipo de examen realizado
    const examCounts = new Map<string, number>();

    // Contar la cantidad de cada tipo de examen realizado
    await Promise.all(
      studies.map(async (study) => {
        await Promise.all(
          study.saleProducts.map(async (studyExam) => {
            const examName = studyExam.product.name;
            examCounts.set(examName, (examCounts.get(examName) || 0) + 1);
          }),
        );
      }),
    );

    // Ordenar los tipos de examen por la cantidad de veces que se han realizado
    const sortedExamCounts = [...examCounts.entries()].sort(
      (a, b) => b[1] - a[1],
    );

    console.log(sortedExamCounts);

    // Convertir el mapa en un arreglo de objetos
    const examStatisticsArray = sortedExamCounts.map(([examName, count]) => ({
      examName,
      count,
    }));

    // Retorna los tipos de examen más realizados en el mes como un arreglo de objetos
    return examStatisticsArray;
  }

  async generateMonthlyExamTypeStatistics(
    data?: GetSalesDto,
  ): Promise<{ examType: string; count: number }[]> {
    try {
      // Obtener estudios realizados en el mes y año especificados
      const studies = await this.findAll(data);

      // Inicializar un mapa para almacenar la cantidad de exámenes por tipo
      const examTypeCounts = new Map<string, number>();

      // Contar la cantidad de exámenes realizados por tipo
      await Promise.all(
        studies.map(async (study) => {
          await Promise.all(
            study.saleProducts.map(async (studyExam) => {
              console.log(studyExam.product);
              const examType = studyExam.product?.category?.name;
              if (examType) {
                examTypeCounts.set(
                  examType,
                  (examTypeCounts.get(examType) || 0) + 1,
                );
              }
            }),
          );
        }),
      );

      // Convertir el mapa en un arreglo de objetos
      const examTypeStatisticsArray = Array.from(examTypeCounts.entries()).map(
        ([examType, count]) => ({
          examType,
          count,
        }),
      );

      // Retorna el arreglo con la cantidad de exámenes realizados por tipo
      return examTypeStatisticsArray;
    } catch (error) {
      // Manejar errores
      console.error('Error en generateMonthlyExamTypeStatistics:', error);
      throw error;
    }
  }


  async getPDF(id: number) {
    const item = await this.findOne(id);
    return this.reportsService.generatePdf(
      'Laboratorio BRIMON',
      item.patient,
      item as any,
      [],
      // item.studyExams,
    );
  }
}
