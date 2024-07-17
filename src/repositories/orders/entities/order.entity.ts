import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { IdEntity } from '../../base';
import { User } from '../../users/entities';
import { StageOrder } from '../enums';
import { OrderProduct } from './orderProduct.entity';

@Entity()
export class Order extends IdEntity {
  @Column({ nullable: false })
  date!: Date;

  @Column({ nullable: false })
  provider!: string;

  @Column({ nullable: false, default: StageOrder.Required })
  stage!: string;

  @Column({ nullable: true })
  note?: string;

  @Column('decimal', { nullable: false })
  total!: number;

  @Column({ nullable: true })
  deadline?: Date;

  @OneToMany(() => OrderProduct, (orderProducts) => orderProducts.order)
  orderProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user?: User;
}
