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

  @Column('decimal', { nullable: true })
  price!: number;

  @Column('decimal', { nullable: true })
  amount!: number;

  @Column('decimal', { nullable: true })
  subtotal!: number;

  @ManyToOne(() => Product, (product) => product.sales)
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.saleProducts)
  sale: Sale;
}
