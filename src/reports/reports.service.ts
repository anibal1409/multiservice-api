import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdf-creator-node';

import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Customer } from '../repositories/customers/entities';
import {
  Sale,
  SaleProduct,
} from '../repositories/sales/entities';
import { ReportsResponseDto } from './dto';
import { CustomAssetsPathFolder } from './types/config';

@Injectable()
export class ReportsService {
  // constructor(
  //   private publicationsService: PublicationsService,
  //   private configurationService: ConfigurationService
  // ) {}
  // async generateReport(reportsDto: ReportsDto): Promise<ReportsResponseDto> {
  //   const dataPublications = await this._getPublicationsData(reportsDto);

  //   const _config = await this.configurationService.getAllConfig();
  //   const _imgPath = _config.imagePath;

  //   let currentImg = '';

  //   if (!_imgPath.includes(DefaultImgOrgName)) {
  //     currentImg = (await this.configurationService.getConfigResponse())
  //       .imageUrl;
  //   }

  //   const _dateRange = reportsDto.dateRange || 'Todas';

  //   const _utcDate = new Date();

  //   const generateDate = new Date(
  //     _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000
  //   );

  //   const _pdfName = `Reporte_publicaciones_${generateDate
  //     .toISOString()
  //     .slice(0, -5)
  //     .replace('T', '_')
  //     .replace(/:/g, '-')}`;

  //   const document: DocumentOptions = {
  //     html: htmlTemplate,
  //     data: {
  //       publications: dataPublications,
  //       date: generateDate.toLocaleDateString('es'),
  //       dateRange: _dateRange,
  //       imgSystem: 'http://localhost:3333/api/public/midbrand.png',
  //       imgOrg: currentImg,
  //     },
  //     path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
  //     type: '',
  //   };

  //   const pageOptions = {
  //     format: 'letter',
  //     orientation: 'portrait',
  //     border: '10mm',
  //     footer: {
  //       height: '10mm',
  //       contents: {
  //         default:
  //           '<span style="color: #444; font-size: 0.5rem">{{page}}/{{pages}}</span>',
  //       },
  //     },
  //   };

  //   try {
  //     const _resp = await pdf.create(document, pageOptions);
  //     console.log(`Reporte generado! Guardado en ${_resp.filename}`);
  //     return { reportUrl: `http://localhost:3333/api/public/${_pdfName}.pdf` };
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException();
  //   }
  // }

  async generatePdf(
    companyName: string,
    patient: Customer,
    study: Sale,
    exams: SaleProduct[],
  ): Promise<ReportsResponseDto> {
    const templateHtml = fs.readFileSync(
      path.resolve('./templates/template.html'),
      'utf8',
    );

    const _utcDate = new Date();

    const generateDate = new Date(
      _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000
    );

    const _pdfName = `Resultados_paciente_${generateDate
      .toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}`;

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
      header: {
        height: '10mm',
        contents: {
          first: '<h1>' + companyName + '</h1>',
          second: '<h2>Generado el ' + new Date().toISOString() + '</h2>',
        },
      },
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null',
        },
      },
    };
    const document = {
      html: templateHtml,
      data: {
        patient,
        study,
        exams,
      },
      path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
      type: '',
    };

    // const pdfBuffer = await pdf.create(document, options);
    // return pdfBuffer;

    // return { reportUrl: `http://localhost:3333/api/public/${_pdfName}.pdf` };
    try {
      const _resp = await pdf.create(document, options);
      console.log(`Reporte generado! Guardado en ${_resp.filename}`);
      return { reportUrl: `http://localhost:3333/api/public/${_pdfName}.pdf` };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
