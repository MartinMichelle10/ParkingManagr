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

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Car } from './car.entity';

import { CreateCarDto } from './dto//create.car.dto';
import { GlobalExceptionFilter } from 'src/global-exception.filter';
import { UpdateCarDto } from './dto/update.car.dto';

@Controller('car')
@ApiTags('Car')
export class CarController {
  constructor(private service: CarService) {}

  @Get()
  @ApiOkResponse({ type: [Car] })
  getAllEmployees() {
    return this.service.getCars();
  }

  @Get(':EmployeeId')
  @ApiOkResponse({ type: Car })
  findOne(@Param('EmployeeId') EmployeeId: string) {
    return this.service.getCarByEmployeeId(EmployeeId);
  }

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  @ApiCreatedResponse({ type: Car })
  create(@Body() createCarDto: CreateCarDto) {
    return this.service.createCar(createCarDto);
  }

  @Delete(':id')
  @UseFilters(new GlobalExceptionFilter())
  delete(@Param('id') id: string) {
    return this.service.deleteCar(id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: Car })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.service.updateCar(id, updateCarDto);
  }
}
