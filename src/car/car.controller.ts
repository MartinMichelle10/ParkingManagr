import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseFilters,
  Catch,
} from '@nestjs/common';

import { CarService } from './car.service';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Car } from './car.entity';

import { CreateCarDto } from './dto//create.car.dto';
import { GlobalExceptionFilter } from './../global-exception.filter';
import { UpdateCarDto } from './dto/update.car.dto';

@Controller('car')
@ApiTags('Car')
export class CarController {
  constructor(private service: CarService) {}

  @Get()
  @ApiOkResponse({ type: [Car] })
  @ApiOperation({ summary: 'List all cars' })
  getAllCars() {
    return this.service.getCars();
  }

  @Get(':EmployeeId')
  @ApiOkResponse({ type: [Car] })
  @ApiOperation({ summary: 'Get cars data by by employee id' })
  findOne(@Param('EmployeeId') EmployeeId: string) {
    return this.service.getCarByEmployeeId(EmployeeId);
  }

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  @ApiCreatedResponse({ type: Car })
  @ApiOperation({ summary: 'Create new car' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.service.createCar(createCarDto);
  }

  @Delete(':id')
  @UseFilters(new GlobalExceptionFilter())
  @ApiOperation({ summary: 'Delete car' })
  delete(@Param('id') id: string) {
    return this.service.deleteCar(id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: Car })
  @ApiOperation({ summary: 'Update car' })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.service.updateCar(id, updateCarDto);
  }
}
