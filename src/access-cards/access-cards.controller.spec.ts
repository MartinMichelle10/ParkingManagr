import { Test, TestingModule } from '@nestjs/testing';
import { AccessCardsController } from './access-cards.controller';

describe('AccessCardsController', () => {
  let controller: AccessCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessCardsController],
    }).compile();

    controller = module.get<AccessCardsController>(AccessCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
