import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessCards } from './../access-cards/access-cards.entity';
import { HighwayPassingMovements } from './../highway-passing-movements/highway-passing-movements.entity';
import { Connection, getConnection, Repository } from 'typeorm';
import { AccessCardTransactions } from './access-card-transactions.entity';

@Injectable()
export class AccessCardTransactionsService {
  constructor(
    @InjectRepository(AccessCardTransactions)
    private transactionsRepository: Repository<AccessCardTransactions>,
    private connection: Connection,
  ) {}

  async getAccessCardsTransactions(): Promise<AccessCardTransactions[]> {
    return await this.transactionsRepository
      .createQueryBuilder('accessCardTransactions')
      .leftJoinAndMapOne(
        'accessCardTransactions.highwayMovements',
        HighwayPassingMovements,
        'highwayPassingMovements',
        'highwayPassingMovements.id = accessCardTransactions.passingHightWayId',
      )
      .leftJoinAndMapOne(
        'accessCardTransactions.accessCard',
        AccessCards,
        'accessCards',
        'accessCards.id = accessCardTransactions.AccessCardId',
      )
      .getMany();
  }

  async getAccessCardTransactions(
    _id: string,
  ): Promise<AccessCardTransactions[]> {
    return await this.transactionsRepository
      .createQueryBuilder('accessCardTransactions')
      .leftJoinAndMapOne(
        'accessCardTransactions.highwayMovements',
        HighwayPassingMovements,
        'highwayPassingMovements',
        'highwayPassingMovements.id = accessCardTransactions.passingHightWayId',
      )
      .leftJoinAndMapOne(
        'accessCardTransactions.accessCard',
        AccessCards,
        'accessCards',
        'accessCards.id = accessCardTransactions.AccessCardId',
      )
      .where('accessCardTransactions.AccessCardId = :AccessCardId', {
        AccessCardId: _id,
      })
      .getMany();
  }
}
