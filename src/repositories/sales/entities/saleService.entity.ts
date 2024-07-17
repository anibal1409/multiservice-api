// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Service } from '../../services/entities';
import { Sale } from './sale.entity';

@Entity()
export class SaleService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { nullable: true })
  price!: number;

  @Column('decimal', { nullable: true })
  amount!: number;

  @Column('decimal', { nullable: true })
  subtotal!: number;

  @ManyToOne(() => Service, (service) => service.sales)
  service: Service;

  @ManyToOne(() => Sale, (sale) => sale.saleServices)
  sale: Sale;
}
