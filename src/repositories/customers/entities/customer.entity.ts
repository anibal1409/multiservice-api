// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
} from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class Customer extends IdEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false })
  idDocument!: string;

  @Column({ nullable: false })
  phone: string;
}
