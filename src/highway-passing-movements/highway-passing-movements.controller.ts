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

import { HighwayPassingMovementsService } from './highway-passing-movements.service';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HighwayPassingMovements } from './highway-passing-movements.entity';
import { CreateMovementDto, RemainingBalance } from './dto/create.movement.dto';
import { GlobalExceptionFilter } from './../global-exception.filter';

@Controller('highway-passing-movements')
@ApiTags('Passing through the highway gate (movements simulation)')
export class HighwayPassingMovementsController {
  constructor(private service: HighwayPassingMovementsService) {}

  @Get()
  @ApiOkResponse({ type: [HighwayPassingMovementsService] })
  @ApiOperation({
    summary: 'List passing through highway gate. ',
  })
  listHighwayPassingMovements() {
    return this.service.listHighwayPassingMovements();
  }

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  @ApiCreatedResponse({ type: RemainingBalance })
  @ApiOperation({
    summary: 'API for simulates passing through the highway gate (by car ID)',
  })
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.service.createMovement(createMovementDto);
  }
}
