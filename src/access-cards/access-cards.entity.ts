import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Car } from '../car/car.entity';

import { Highways } from '../highways/highways.entity';

import { HighwayPassingMovements } from '../highway-passing-movements/highway-passing-movements.entity';
import { AccessCardTransactions } from 'src/access-card-transactions/access-card-transactions.entity';

@Entity('AccessCards')
export class AccessCards {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  Name: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ type: 'numeric', precision: 10, scale: 2, default: () => 0 })
  Balance: number;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ nullable: true })
  lastChargeDate: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ default: () => false })
  isDeleted: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Car, (car) => car.accessCards)
  @JoinColumn({ name: 'CarId' })
  car: Car;

  @ApiProperty()
  @Column()
  CarId: string;

  @ManyToOne(() => Highways, (highway) => highway.accessCards)
  @JoinColumn({ name: 'HighwayId' })
  highway: Highways;

  @ApiProperty()
  @Column()
  HighwayId: string;

  @OneToMany(
    () => HighwayPassingMovements,
    (highwayPassingMovements) => highwayPassingMovements.accessCard,
  )
  highwayPassingMovements: HighwayPassingMovements[];

  @OneToMany(
    () => AccessCardTransactions,
    (accessCardTransactions) => accessCardTransactions.accessCard,
  )
  accessCardTransactions: AccessCardTransactions[];
}
