import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Employees } from 'src/employees/employees.entity';

export class CreateCarDto {
  @ApiProperty()
  EmployeeId: string;

  @ApiProperty({ required: false, nullable: true })
  Name: string;

  @ApiProperty()
  Brand: string;

  @ApiProperty()
  Model: string;

  @ApiProperty()
  PlateNumber: string;

  @Exclude()
  createdAt: Date;
  updatedAt: Date;
  id: string;
  employee: Employees;
  isDeleted: boolean;
  deletedAt: Date;
}
