// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { nullable: false })
  price!: number;

  @Column('decimal', { nullable: false })
  amount!: number;

  @Column('decimal', { nullable: false })
  subtotal!: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;
}
