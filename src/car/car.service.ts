import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Car } from './car.entity';

import { Employees } from './../employees/employees.entity';

import { AccessCards } from './../access-cards/access-cards.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async getCars(): Promise<Car[]> {
    return await this.carRepository
      .createQueryBuilder('car')
      .innerJoinAndMapOne(
        'car.employee',
        Employees,
        'employee',
        'employee.id = car.EmployeeId',
      )
      .leftJoinAndMapOne(
        'car.accessCards',
        AccessCards,
        'accessCards',
        'accessCards.carId = car.id',
      )
      .where('car.isDeleted = :isDeleted', { isDeleted: false })
      .getMany();
  }

  async getCarByEmployeeId(_id: string): Promise<Car[]> {
    return await this.carRepository
      .createQueryBuilder('car')
      .innerJoinAndMapOne(
        'car.employee',
        Employees,
        'employee',
        'employee.id = car.EmployeeId',
      )
      .leftJoinAndMapOne(
        'car.accessCards',
        AccessCards,
        'accessCards',
        'accessCards.carId = car.id',
      )
      .where('car.isDeleted = :isDeleted AND car.EmployeeId= :EmployeeId', {
        isDeleted: false,
        EmployeeId: _id,
      })
      .getMany();
  }

  async createCar(car: Car) {
    const carData = await this.carRepository.findOne({
      select: [
        'id',
        'Name',
        'Model',
        'Brand',
        'employee',
        'PlateNumber',
        'accessCards',
      ],
      where: [{ PlateNumber: car.PlateNumber, isDeleted: false }],
    });

    if (carData) {
      throw new Error('This Car already exists on our system');
    }

    return await this.carRepository.save(car);
  }

  async deleteCar(_id: string) {
    const deleteResponse = await getConnection()
      .createQueryBuilder()
      .update(Car)
      .set({ isDeleted: true, deletedAt: new Date().toISOString() })
      .where('id = :id', { id: _id })
      .execute();

    if (!deleteResponse.affected) {
      throw new Error('Car is not deleted !');
    }

    return 'Car deleted successfully';
  }

  async updateCar(_id: string, car: Car) {
    const updateResponse = await getConnection()
      .createQueryBuilder()
      .update(Car)
      .set({ ...car, updatedAt: new Date().toISOString() })
      .where('id = :id', { id: _id })
      .execute();

    if (!updateResponse.affected) {
      throw new Error('Car is not updated !');
    }

    return 'Car deleted successfully';
  }
}
