import { Module } from '@nestjs/common';
import { AccessCardsService } from './access-cards.service';
import { AccessCardsController } from './access-cards.controller';
import { Car } from './../car/car.entity';
import { Employees } from './../employees/employees.entity';
import { AccessCards } from './access-cards.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccessCards, Car, Employees])],
  providers: [AccessCardsService],
  controllers: [AccessCardsController],
})
export class AccessCardsModule {}
