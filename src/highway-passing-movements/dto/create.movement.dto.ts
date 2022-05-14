import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AccessCards } from 'src/access-cards/access-cards.entity';

export class CreateMovementDto {
  @ApiProperty()
  CarId: string;

  @ApiProperty()
  HighwayId: string;

  @Exclude()
  createdAt: Date;
  updatedAt: Date;
  id: string;
  passFee: number;
  accessCard: AccessCards;
  AccessCardId: string;
}
