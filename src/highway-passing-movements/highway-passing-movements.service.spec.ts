import { Test, TestingModule } from '@nestjs/testing';
import { HighwayPassingMovementsService } from './highway-passing-movements.service';

describe('HighwayPassingMovementsService', () => {
  let service: HighwayPassingMovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighwayPassingMovementsService],
    }).compile();

    service = module.get<HighwayPassingMovementsService>(HighwayPassingMovementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
