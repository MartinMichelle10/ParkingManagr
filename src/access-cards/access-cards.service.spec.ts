import { Test, TestingModule } from '@nestjs/testing';
import { AccessCardsService } from './access-cards.service';

describe('AccessCardsService', () => {
  let service: AccessCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessCardsService],
    }).compile();

    service = module.get<AccessCardsService>(AccessCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
