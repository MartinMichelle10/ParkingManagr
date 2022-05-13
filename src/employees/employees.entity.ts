import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../car/car.entity';

@Entity('Employees')
export class Employees {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ length: 25 })
  Name: string;

  @ApiProperty()
  @Column({ length: 25 })
  Position: string;

  @ApiProperty()
  @Column()
  Age: number;

  @Column('date')
  createdAt: Date;

  @Column('date')
  updatedAt: Date;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => Car, (car) => car.employee)
  car: Car[];
}
