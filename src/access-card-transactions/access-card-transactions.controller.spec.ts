import { Test, TestingModule } from '@nestjs/testing';
import { AccessCardTransactionsController } from './access-card-transactions.controller';

describe('AccessCardTransactionsController', () => {
  let controller: AccessCardTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessCardTransactionsController],
    }).compile();

    controller = module.get<AccessCardTransactionsController>(
      AccessCardTransactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
