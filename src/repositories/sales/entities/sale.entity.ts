// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Customer } from '../../customers';
import { User } from '../../users/entities';
import { StageStudy } from '../enums';
import { SaleProduct } from './saleProduct.entity';
import { SaleService } from './saleService.entity';

@Entity()
export class Sale extends IdEntity {
  @Index('sale_stage_index')
  @Column({ nullable: false, default: StageStudy.Pending })
  stage!: string;

  @Column({ nullable: false })
  date!: Date;

  @Column({ nullable: true })
  note?: string;

  @Column({ nullable: false, default: false })
  sendEmail: boolean;

  @Column({ nullable: false, default: 0 })
  iva: number;

  @Column({ nullable: false, default: 0 })
  subttotal: number;

  @Column({ nullable: false, default: 0 })
  total: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn()
  customer?: Customer;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user?: User;

  @OneToMany(() => SaleProduct, (salesProducts) => salesProducts.sale)
  saleProducts: SaleProduct[];

  @OneToMany(() => SaleService, (saleService) => saleService.sale)
  saleServices: SaleService[];
}
