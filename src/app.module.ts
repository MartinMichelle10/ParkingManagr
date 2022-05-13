import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [TypeOrmModule.forRoot(), EmployeesModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
