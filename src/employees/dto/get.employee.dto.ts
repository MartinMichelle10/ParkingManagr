import { ApiProperty } from '@nestjs/swagger';

export class getEmployeeDTO {
  @ApiProperty({ required: false, nullable: true })
  id: string;
}
