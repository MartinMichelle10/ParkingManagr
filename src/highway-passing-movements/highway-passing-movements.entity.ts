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

import { AccessCards } from 'src/access-cards/access-cards.entity';

@Entity('HighwayPassingMovements')
export class HighwayPassingMovements {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ type: 'numeric', precision: 10, scale: 2, default: () => 0 })
  passFee: number;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  updatedAt: Date;

  @ManyToOne(
    () => AccessCards,
    (AccessCards) => AccessCards.highwayPassingMovements,
  )
  @JoinColumn({ name: 'AccessCardId' })
  accessCard: AccessCards;

  @ApiProperty()
  @Column()
  AccessCardId: string;
}
