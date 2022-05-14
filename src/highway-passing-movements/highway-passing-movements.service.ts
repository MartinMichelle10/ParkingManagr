import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';
import { HighwayPassingMovements } from './highway-passing-movements.entity';
import { AccessCards } from 'src/access-cards/access-cards.entity';
import { Highways } from 'src/highways/highways.entity';
import { CreateMovementDto } from './dto/create.movement.dto';
import {
  AccessCardTransactions,
  transactionTypes,
  relatedTypes,
} from 'src/access-card-transactions/access-card-transactions.entity';

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

  async createMovement(movement: CreateMovementDto) {
    // Start transaction, If any error occurs rollback changes
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Step [1] - Get access card data of the car and highway
      const cardData = await queryRunner.manager.findOne(AccessCards, {
        isDeleted: false,
        CarId: movement.CarId,
        HighwayId: movement.HighwayId,
      });

      if (!cardData) {
        throw new Error('Access card is not exists');
      }

      // Step [2] - Get highway data and fee amount to go through highway
      const highwayData = await queryRunner.manager.findOne(Highways, {
        isDeleted: false,
        id: cardData.HighwayId,
      });

      if (!highwayData) {
        throw new Error('Highway is not exists');
      }

      // Step [3] - Check If the car passes through the highway gate 2 times within 1 minute the we only
      // charge the card one (second pass is free)

      const currentDate: any = new Date();

      const lastChargeDate: any = new Date(cardData.lastChargeDate);

      const timeDiffPass =
        Math.round(Math.abs(currentDate - lastChargeDate) / 1000 / 60) >= 1;

      const passFee = timeDiffPass ? highwayData.Fee : 0;

      // Step [4] - Save movement
      const newMove = await queryRunner.manager.save(HighwayPassingMovements, {
        AccessCardId: cardData.id,
        passFee,
      });

      // Throw Error if Pass Fee greater than balance in the access card
      if (passFee > cardData.Balance) {
        throw new Error('Insufficient funds in this card !');
      }

      // Step [5] - Update card balance
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

      // Step [6] - add transaction log for this process
      await queryRunner.manager.save(AccessCardTransactions, {
        TransactionType: transactionTypes.WITHDRAW,
        RelatedType: relatedTypes.PASSING,
        Amount: passFee,
        AccessCardId: cardData.id,
        passingHightWayId: newMove.id,
      });

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        ...newMove,
        RemainingBalance: cardData.Balance - highwayData.Fee,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }
}
