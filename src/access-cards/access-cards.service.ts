import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';

import { Car } from './../car/car.entity';
import { Highways } from './../highways/highways.entity';
import { AccessCards } from './access-cards.entity';

@Injectable()
export class AccessCardsService {
  constructor(
    @InjectRepository(AccessCards)
    private accessCardsRepository: Repository<AccessCards>,
    private connection: Connection,
  ) {}

  async getAccessCards(): Promise<AccessCards[]> {
    return await this.accessCardsRepository
      .createQueryBuilder('accessCards')
      .innerJoinAndMapOne(
        'accessCards.car',
        Car,
        'car',
        'car.id = accessCards.CarId',
      )
      .innerJoinAndMapOne(
        'accessCards.highway',
        Highways,
        'highway',
        'highway.id = accessCards.HighwayId',
      )
      .where('accessCards.isDeleted = :isDeleted', { isDeleted: false })
      .getMany();
  }

  async createAccessCard(card: AccessCards) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cardData = await queryRunner.manager.findOne(AccessCards, {
        isDeleted: false,
        CarId: card.CarId,
        HighwayId: card.HighwayId,
      });

      if (cardData) {
        throw new Error('Access card for this car and highway is exists');
      }

      const newCard = await queryRunner.manager.save(AccessCards, card);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return newCard;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async deleteAccessCard(_id: string) {
    const deleteResponse = await getConnection()
      .createQueryBuilder()
      .update(AccessCards)
      .set({ isDeleted: true, deletedAt: new Date().toISOString() })
      .where('id = :id', { id: _id })
      .execute();

    if (!deleteResponse.affected) {
      throw new Error('Card is not deleted !');
    }

    return 'Card deleted successfully';
  }
}
