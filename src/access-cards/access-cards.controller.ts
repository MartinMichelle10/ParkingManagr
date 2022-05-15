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

import { AccessCardsService } from './access-cards.service';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AccessCards } from './access-cards.entity';
import { CreateAccessCardDto } from './dto/create.card.dto';
import { GlobalExceptionFilter } from './../global-exception.filter';

@Controller('access-cards')
@ApiTags('Access Cards')
export class AccessCardsController {
  constructor(private service: AccessCardsService) {}

  @Get()
  @ApiOkResponse({ type: [AccessCards] })
  @ApiOperation({ summary: 'List all access cards for all employees' })
  getAllAccessCards() {
    return this.service.getAccessCards();
  }

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  @ApiCreatedResponse({ type: AccessCards })
  @ApiOperation({
    summary: 'Register a car in the highway and creates it’s access card',
  })
  create(@Body() createAccessCardDto: CreateAccessCardDto) {
    return this.service.createAccessCard(createAccessCardDto);
  }

  @Delete(':id')
  @UseFilters(new GlobalExceptionFilter())
  @ApiOperation({
    summary: 'Delete access card',
  })
  delete(@Param('id') id: string) {
    return this.service.deleteAccessCard(id);
  }
}
