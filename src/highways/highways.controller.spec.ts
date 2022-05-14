import { Test, TestingModule } from '@nestjs/testing';
import { HighwaysController } from './highways.controller';

describe('HighwaysController', () => {
  let controller: HighwaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighwaysController],
    }).compile();

    controller = module.get<HighwaysController>(HighwaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
