import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessCards } from 'src/access-cards/access-cards.entity';
import { AccessCardTransactionsService } from './access-card-transactions.service';
import { AccessCardTransactions } from './access-card-transactions.entity';
import { HighwayPassingMovements } from 'src/highway-passing-movements/highway-passing-movements.entity';
import { AccessCardTransactionsController } from './access-card-transactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccessCards,
      AccessCardTransactions,
      HighwayPassingMovements,
    ]),
  ],
  providers: [AccessCardTransactionsService],
  controllers: [AccessCardTransactionsController],
})
export class AccessCardTransactionsModule {}
