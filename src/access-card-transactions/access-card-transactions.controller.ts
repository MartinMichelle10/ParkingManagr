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

import { AccessCardTransactions } from './access-card-transactions.entity';

import { AccessCardTransactionsService } from './access-card-transactions.service';

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('access-card-transactions')
@ApiTags('Access Card transactions')
export class AccessCardTransactionsController {
  constructor(private service: AccessCardTransactionsService) {}

  @Get()
  @ApiOkResponse({ type: [AccessCardTransactions] })
  getAllAccessCards() {
    return this.service.getAccessCardsTransactions();
  }
}
