// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Category } from '../../categories';
import { OrderProduct } from '../../orders/entities';
import { SaleProduct } from '../../sales/entities';

@Entity()
export class Product extends IdEntity {
  @Column({ nullable: false, unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  price!: number;

  @Column({ nullable: true })
  path!: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  category?: Category;

  @OneToMany(() => SaleProduct, (sales) => sales.product)
  sales: SaleProduct[];

  @OneToMany(() => OrderProduct, (orders) => orders.product)
  orders: OrderProduct[];
}
