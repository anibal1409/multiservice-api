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
import { SaleProduct } from '../../sales/entities';

@Entity()
export class Service extends IdEntity {
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

  @OneToMany(() => SaleProduct, (sales) => sales.sale)
  sales: SaleProduct[];
}
