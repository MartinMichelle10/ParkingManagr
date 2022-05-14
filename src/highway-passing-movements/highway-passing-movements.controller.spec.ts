import { Test, TestingModule } from '@nestjs/testing';
import { HighwayPassingMovementsController } from './highway-passing-movements.controller';

describe('HighwayPassingMovementsController', () => {
  let controller: HighwayPassingMovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighwayPassingMovementsController],
    }).compile();

    controller = module.get<HighwayPassingMovementsController>(HighwayPassingMovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
