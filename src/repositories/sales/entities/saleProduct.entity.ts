// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities';
import { Sale } from './sale.entity';

@Entity()
export class SaleProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  price!: string;

  @Column({ nullable: true })
  amount!: string;

  @Column({ nullable: true })
  total!: string;

  @ManyToOne(() => Product, (product) => product.sales)
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.saleProducts)
  sale: Sale;
}
