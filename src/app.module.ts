import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { CarModule } from './car/car.module';
import { HighwaysModule } from './highways/highways.module';
import { AccessCardsModule } from './access-cards/access-cards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EmployeesModule,
    CarModule,
    HighwaysModule,
    AccessCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
