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
import { HighwayPassingMovements } from 'src/highway-passing-movements/highway-passing-movements.entity';

export enum transactionTypes {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export enum relatedTypes {
  WELCOME = 'welcome',
  PASSING = 'passing',
}

@Entity('AccessCardTransactions')
export class AccessCardTransactions {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: transactionTypes,
    default: transactionTypes.WITHDRAW,
  })
  TransactionType: transactionTypes;

  @Column({
    type: 'enum',
    enum: relatedTypes,
    default: relatedTypes.PASSING,
  })
  RelatedTypes: relatedTypes;

  @ApiProperty({ required: false, nullable: false })
  @Column({ type: 'numeric', precision: 10, scale: 2, default: () => 0 })
  Amount: number;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(
    () => AccessCards,
    (AccessCards) => AccessCards.accessCardTransactions,
  )
  @JoinColumn({ name: 'AccessCardId' })
  accessCard: AccessCards;

  @ManyToOne(
    () => HighwayPassingMovements,
    (HighwayPassingMovements) => HighwayPassingMovements.accessCardTransactions,
  )
  @JoinColumn({ name: 'passingHightWayId' })
  highwayMovements: HighwayPassingMovements;

  @ApiProperty()
  @Column()
  AccessCardId: string;

  @ApiProperty()
  @Column()
  passingHightWayId: string;
}
