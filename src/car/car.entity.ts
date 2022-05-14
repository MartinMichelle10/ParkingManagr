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

import { Employees } from '../employees/employees.entity';

import { AccessCards } from '../access-cards/access-cards.entity';

@Entity('Car')
export class Car {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ length: 25 })
  Name: string;

  @ApiProperty()
  @Column({ length: 25 })
  Brand: string;

  @ApiProperty()
  @Column({ length: 25 })
  Model: string;

  @ApiProperty()
  @Column({ length: 25 })
  PlateNumber: string;

  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;

  @Column({ default: () => false })
  isDeleted: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Employees, (employee) => employee.car)
  @JoinColumn({ name: 'EmployeeId' })
  employee: Employees;

  @ApiProperty()
  @Column()
  EmployeeId: string;

  @OneToMany(() => AccessCards, (accessCards) => accessCards.car)
  accessCards: AccessCards[];
}
