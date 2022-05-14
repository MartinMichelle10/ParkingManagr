import { Module } from '@nestjs/common';
import { HighwayPassingMovementsService } from './highway-passing-movements.service';
import { HighwayPassingMovementsController } from './highway-passing-movements.controller';
import { AccessCards } from './../access-cards/access-cards.entity';
import { HighwayPassingMovements } from './highway-passing-movements.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccessCards, HighwayPassingMovements])],
  providers: [HighwayPassingMovementsService],
  controllers: [HighwayPassingMovementsController],
})
export class HighwayPassingMovementsModule {}
