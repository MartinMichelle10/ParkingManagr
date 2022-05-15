import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Car } from './../../car/car.entity';
import { Highways } from './../../highways/highways.entity';
import { HighwayPassingMovements } from './../../highway-passing-movements/highway-passing-movements.entity';
import { AccessCardTransactions } from './../../access-card-transactions/access-card-transactions.entity';
export class CreateAccessCardDto {
  @ApiProperty()
  CarId: string;

  @ApiProperty({ required: false, nullable: true })
  Name: string;

  @ApiProperty()
  HighwayId: string;

  @Exclude()
  createdAt: Date;
  updatedAt: Date;
  id: string;
  lastChargeDate: Date;
  isDeleted: boolean;
  deletedAt: Date;
  car: Car;
  highway: Highways;
  Balance: number;
  highwayPassingMovements: HighwayPassingMovements[];
  accessCardTransactions: AccessCardTransactions[];
}
