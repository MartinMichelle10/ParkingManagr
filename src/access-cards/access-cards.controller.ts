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

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AccessCards } from './access-cards.entity';
import { CreateAccessCardDto } from './dto/create.card.dto';
import { GlobalExceptionFilter } from 'src/global-exception.filter';

@Controller('access-cards')
@ApiTags('Access Cards')
export class AccessCardsController {
  constructor(private service: AccessCardsService) {}

  @Get()
  @ApiOkResponse({ type: [AccessCards] })
  getAllAccessCards() {
    return this.service.getAccessCards();
  }

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  @ApiCreatedResponse({ type: AccessCards })
  create(@Body() createAccessCardDto: CreateAccessCardDto) {
    return this.service.createAccessCard(createAccessCardDto);
  }

  @Delete(':id')
  @UseFilters(new GlobalExceptionFilter())
  delete(@Param('id') id: string) {
    return this.service.deleteAccessCard(id);
  }
}
