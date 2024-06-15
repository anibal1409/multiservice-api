import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { IdEntity } from '../../base';
import { OrderProduct } from './orderProduct.entity';

@Entity()
export class Order extends IdEntity {
  @Column({ nullable: false })
  provider!: string;

  @Column({ nullable: false })
  stage!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  iva!: number;

  @Column({ nullable: false })
  subtotal!: number;

  @Column({ nullable: false })
  total!: number;

  @Column({ nullable: false })
  deadline!: Date;

  @OneToMany(() => OrderProduct, (orderProducts) => orderProducts.order)
  orderProducts: OrderProduct[];
}
