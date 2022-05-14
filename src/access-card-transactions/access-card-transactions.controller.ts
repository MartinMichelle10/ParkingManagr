import { Controller, Get, Param } from '@nestjs/common';

import { AccessCardTransactions } from './access-card-transactions.entity';

import { AccessCardTransactionsService } from './access-card-transactions.service';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('access-card-transactions')
@ApiTags('Access Card transactions')
export class AccessCardTransactionsController {
  constructor(private service: AccessCardTransactionsService) {}

  @Get()
  @ApiOperation({ summary: 'List all access cards transaction logs.' })
  @ApiOkResponse({ type: [AccessCardTransactions] })
  getAllAccessCardsTransactions() {
    return this.service.getAccessCardsTransactions();
  }

  @Get(':AccessCardId')
  @ApiOperation({ summary: 'List transactions of specific card.' })
  @ApiOkResponse({ type: [AccessCardTransactions] })
  getAccessCardTransactions(@Param('AccessCardId') AccessCardId: string) {
    return this.service.getAccessCardTransactions(AccessCardId);
  }
}
