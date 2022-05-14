import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighwaysService } from './highways.service';
import { HighwaysController } from './highways.controller';
import { Highways } from './highways.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Highways])],
  providers: [HighwaysService],
  controllers: [HighwaysController],
})
export class HighwaysModule {}
