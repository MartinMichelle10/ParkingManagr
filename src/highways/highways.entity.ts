import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { AccessCards } from '../access-cards/access-cards.entity';

@Entity('Highway')
export class Highways {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ length: 25 })
  Name: string;

  @ApiProperty()
  @Column()
  Fee: number;

  @Column('date')
  createdAt: Date;

  @Column('date')
  updatedAt: Date;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => AccessCards, (accessCards) => accessCards.highway)
  accessCards: AccessCards[];
}
