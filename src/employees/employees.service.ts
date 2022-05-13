import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
  ) {}

  async getEmployees(): Promise<Employees[]> {
    return await this.employeesRepository.find({
      select: ['id', 'Name', 'Age', 'Position'],
      where: [{ isDeleted: false }],
    });
  }

  async getEmployeesById(_id: string): Promise<Employees> {
    return await this.employeesRepository.findOne({
      select: ['id', 'Name', 'Age', 'Position'],
      where: [{ id: _id }],
    });
  }

  async updateEmployees(employee: Employees) {
    this.employeesRepository.save(employee);
  }

  async deleteEmployees(employee: Employees) {
    this.employeesRepository.delete(employee);
  }
}
