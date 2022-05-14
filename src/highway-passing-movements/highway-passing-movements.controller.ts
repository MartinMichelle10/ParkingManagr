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

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HighwayPassingMovements } from './highway-passing-movements.entity';
import { CreateMovementDto } from './dto/create.movement.dto';
import { GlobalExceptionFilter } from 'src/global-exception.filter';

@Controller('highway-passing-movements')
@ApiTags('Passing through the highway gate (movements simulation)')
export class HighwayPassingMovementsController {
  constructor(private service: HighwayPassingMovementsService) {}

  @Get()
  @ApiOkResponse({ type: [HighwayPassingMovementsService] })
  getAllAccessCards() {
    return this.service.listHighwayPassingMovements();
  }

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  @ApiCreatedResponse({ type: HighwayPassingMovements })
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.service.createMovement(createMovementDto);
  }
}
