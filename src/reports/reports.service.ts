import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import * as pdf from 'pdf-creator-node';

import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Customer } from '../repositories/customers/entities';
import {
  Order,
  OrderProduct,
} from '../repositories/orders';
import {
  Sale,
  SaleProduct,
} from '../repositories/sales/entities';
import { SaleService } from '../repositories/sales/entities/saleService.entity';
import { ReportsResponseDto } from './dto';
import { CustomAssetsPathFolder } from './types/config';

@Injectable()
export class ReportsService {

  async generatePdfSale(
    customer: Customer,
    sale: Sale,
    products: SaleProduct[],
    services: SaleService[],
  ): Promise<ReportsResponseDto> {
    const templateHtml = fs.readFileSync(
      path.resolve('./templates/sale.html'),
      'utf8',
    );

    const _utcDate = new Date();

    const generateDate = new Date(
      _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000,
    );

    const _pdfName = `nota_de_entrega_${generateDate
      .toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}`;

    const options = {
      format: 'letter',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default: `<table class="footer">
                    <tbody>
                      <tr>
                        <td>
                          Generado el ${moment().format('DD/MM/YYYY HH:mm')}
                        </td>
                        <td class="right">
                          <span>{{page}}/{{pages}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>`,
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
        customer: customer,
        sale: {
          ...sale,
          date: moment(sale.date).format('DD/MM/YYYY HH:mm'),
        },
        products: products,
        showProducts: products.length > 0,
        services: services,
        showServices: services.length > 0,
        date: moment().format('DD/MM/YYYY HH:mm'),
        imgSystem: 'http://localhost:3333/public/logo.png',
        companyName: process.env.COMPANY_NAME,
        companyDocument: process.env.COMPANY_DOCUMENT,
        companyAddress: process.env.COMPANY_ADDRESS,
      },
      path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
      type: '',
    };

    try {
      const _resp = await pdf.create(document, options);
      console.log(`Reporte generado! Guardado en ${_resp.filename}`);
      return {
        reportUrl: `http://localhost:3333/public/${_pdfName}.pdf`,
        name: _pdfName,
        // buffer: pdfBuffer,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async generatePdfOrder(
    provider: string,
    order: Order,
    products: OrderProduct[],
  ): Promise<ReportsResponseDto> {
    const templateHtml = fs.readFileSync(
      path.resolve('./templates/order.html'),
      'utf8',
    );

    const _utcDate = new Date();

    const generateDate = new Date(
      _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000
    );

    const _pdfName = `pedido_${generateDate
      .toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}`;

    const options = {
      format: 'letter',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default: `<table class="footer">
                    <tbody>
                      <tr>
                        <td>
                          Generado el ${moment().format('DD/MM/YYYY HH:mm')}
                        </td>
                        <td class="right">
                          <span>{{page}}/{{pages}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>`,
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
        provider: provider,
        order: {
          ...order,
          date: moment(order.date).format('DD/MM/YYYY HH:mm'),
          deadline: order?.deadline
            ? moment(order.deadline).format('DD/MM/YYYY HH:mm')
            : 'N/A',
        },
        products: products,
        date: moment().format('DD/MM/YYYY HH:mm'),
        imgSystem: 'http://localhost:3333/public/logo.png',
        companyName: process.env.COMPANY_NAME,
        companyDocument: process.env.COMPANY_DOCUMENT,
        companyAddress: process.env.COMPANY_ADDRESS,
      },
      path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
      type: '',
    };

    try {
      const _resp = await pdf.create(document, options);
      console.log(`Reporte generado! Guardado en ${_resp.filename}`);
      return {
        reportUrl: `http://localhost:3333/public/${_pdfName}.pdf`,
        name: _pdfName,
        // buffer: pdfBuffer,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async generateReport(
    sales: Sale[],
    total: string,
    start: string,
    end: string,
  ): Promise<ReportsResponseDto> {
    const templateHtml = fs.readFileSync(
      path.resolve('./templates/report_sales.html'),
      'utf8',
    );

    const _utcDate = new Date();

    const generateDate = new Date(
      _utcDate.getTime() - _utcDate.getTimezoneOffset() * 60000
    );

    const _pdfName = `reporte_de_ventas_${generateDate
      .toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}`;

    const options = {
      format: 'letter',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default: `<table class="footer">
                    <tbody>
                      <tr>
                        <td>
                          Generado el ${moment().format('DD/MM/YYYY HH:mm')}
                        </td>
                        <td class="right">
                          <span>{{page}}/{{pages}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>`,
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
        sales: sales,
        date: moment().format('DD/MM/YYYY HH:mm'),
        imgSystem: 'http://localhost:3333/public/logo.png',
        total,
        companyName: process.env.COMPANY_NAME,
        companyDocument: process.env.COMPANY_DOCUMENT,
        companyAddress: process.env.COMPANY_ADDRESS,
        start,
        end,
      },
      path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
      type: '',
    };

    try {
      const _resp = await pdf.create(document, options);
      console.log(`Reporte generado! Guardado en ${_resp.filename}`);
      return {
        reportUrl: `http://localhost:3333/public/${_pdfName}.pdf`,
        name: _pdfName,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
