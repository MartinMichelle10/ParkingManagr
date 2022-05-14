import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Highways } from './highways.entity';

@Injectable()
export class HighwaysService {
  constructor(
    @InjectRepository(Highways)
    private employeesRepository: Repository<Highways>,
  ) {}

  async getHighways(): Promise<Highways[]> {
    return await this.employeesRepository.find({
      select: ['id', 'Name', 'Fee'],
      where: [{ isDeleted: false }],
    });
  }

  async getHighwayById(_id: string): Promise<Highways> {
    return await this.employeesRepository.findOne({
      select: ['id', 'Name', 'Fee'],
      where: [{ id: _id }],
    });
  }
}
