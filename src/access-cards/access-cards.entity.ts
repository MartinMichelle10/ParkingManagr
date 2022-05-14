import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Car } from '../car/car.entity';

import { Highways } from '../highways/highways.entity';

@Entity('AccessCards')
@Unique(['CarId', 'HighwayId'])
export class AccessCards {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ length: 25 })
  Name: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ type: 'numeric', precision: 10, scale: 2, default: () => 0 })
  Balance: number;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  lastChargeDate: Date;

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
}
