import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Car } from 'src/car/car.entity';
import { Highways } from 'src/highways/highways.entity';
import { HighwayPassingMovements } from 'src/highway-passing-movements/highway-passing-movements.entity';
import { AccessCardTransactions } from 'src/access-card-transactions/access-card-transactions.entity';
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
