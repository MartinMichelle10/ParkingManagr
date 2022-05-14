import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';
import { HighwayPassingMovements } from './highway-passing-movements.entity';
import { AccessCards } from 'src/access-cards/access-cards.entity';
import { Highways } from 'src/highways/highways.entity';

@Injectable()
export class HighwayPassingMovementsService {
  constructor(
    @InjectRepository(HighwayPassingMovements)
    private highwayPassingMovementsRepository: Repository<HighwayPassingMovements>,
    private connection: Connection,
  ) {}

  async listHighwayPassingMovements(): Promise<HighwayPassingMovements[]> {
    return await this.highwayPassingMovementsRepository
      .createQueryBuilder('highwayPassingMovements')
      .innerJoinAndMapOne(
        'highwayPassingMovements.accessCard',
        AccessCards,
        'accessCards',
        'accessCards.id = highwayPassingMovements.AccessCardId',
      )
      .getMany();
  }

  async createMovement(move: HighwayPassingMovements) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cardData = await queryRunner.manager.findOne(AccessCards, {
        isDeleted: false,
        id: move.AccessCardId,
      });

      if (!cardData) {
        throw new Error('Access card is not exists');
      }

      const highwayData = await queryRunner.manager.findOne(Highways, {
        isDeleted: false,
        id: cardData.HighwayId,
      });

      if (!highwayData) {
        throw new Error('Highway is not exists');
      }

      const currentDate: any = new Date();
      const lastChargeDate: any = new Date(cardData.lastChargeDate);

      const timeDiffPass =
        Math.abs(currentDate - lastChargeDate) / 1000 / 60 > 2;

      console.log(
        timeDiffPass,
        Math.abs(currentDate - lastChargeDate) / 1000 / 60,
      );

      const newMove = await queryRunner.manager.save(HighwayPassingMovements, {
        ...move,
        passFee: timeDiffPass ? highwayData.Fee : 0,
      });

      if (timeDiffPass) {
        const updateCardBalance = await queryRunner.manager
          .createQueryBuilder()
          .update(AccessCards)
          .set({
            Balance: cardData.Balance - highwayData.Fee,
            lastChargeDate: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .where('id = :id', { id: cardData.id })
          .execute();

        if (!updateCardBalance.affected) {
          throw new Error('Card Balance is not updated !');
        }
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return newMove;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }
}
