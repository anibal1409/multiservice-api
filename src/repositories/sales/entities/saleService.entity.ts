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

  @Column({ nullable: true })
  price!: string;

  @Column({ nullable: true })
  amount!: string;

  @Column({ nullable: true })
  total!: string;

  @ManyToOne(() => Service, (service) => service.sales)
  service: Service;

  @ManyToOne(() => Sale, (sale) => sale.saleServices)
  sale: Sale;
}
