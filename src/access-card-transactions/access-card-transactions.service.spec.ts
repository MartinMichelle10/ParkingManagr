import { Test, TestingModule } from '@nestjs/testing';
import { AccessCardTransactionsService } from './access-card-transactions.service';

describe('AccessCardTransactionsService', () => {
  let service: AccessCardTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessCardTransactionsService],
    }).compile();

    service = module.get<AccessCardTransactionsService>(
      AccessCardTransactionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
