import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AccessCards } from './../../access-cards/access-cards.entity';
import { Employees } from './../../employees/employees.entity';

export class UpdateCarDto {
  @ApiProperty({ required: false, nullable: true })
  Name: string;

  @ApiProperty()
  Brand: string;

  @ApiProperty()
  Model: string;

  @Exclude()
  createdAt: Date;
  updatedAt: Date;
  id: string;
  employee: Employees;
  isDeleted: boolean;
  deletedAt: Date;
  PlateNumber: string;
  EmployeeId: string;
  accessCards: AccessCards[];
}
