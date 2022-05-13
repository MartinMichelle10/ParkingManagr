import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './car.entity';
import { Employees } from './../employees/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Employees])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
