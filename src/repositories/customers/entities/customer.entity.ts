// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  Index,
} from 'typeorm';

import { IdEntity } from '../../base';
import { CustomerType } from '../enums';

@Entity()
export class Customer extends IdEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  idDocument!: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Index('customer_type_index')
  @Column({ nullable: false, default: CustomerType.NaturalPerson })
  type!: string;
}
