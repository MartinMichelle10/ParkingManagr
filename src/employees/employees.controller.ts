import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';

import { EmployeesService } from './employees.service';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Employees } from './employees.entity';

// import { getEmployeeDTO } from './dto/get.employee.dto';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(private service: EmployeesService) {}

  @Get()
  @ApiOkResponse({ type: [Employees] })
  @ApiOperation({
    summary: 'List Employees. ',
  })
  getAllEmployees() {
    return this.service.getEmployees();
  }

  @Get(':id')
  @ApiOkResponse({ type: Employees })
  @ApiOperation({
    summary: 'Get Employee by ID. ',
  })
  findOne(@Param('id') id: string) {
    return this.service.getEmployeesById(id);
  }
}
