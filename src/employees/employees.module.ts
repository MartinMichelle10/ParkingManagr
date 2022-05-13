import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employees } from './employees.entity';
import { Car } from './../car/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employees, Car])],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
