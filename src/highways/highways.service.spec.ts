import { Test, TestingModule } from '@nestjs/testing';
import { HighwaysService } from './highways.service';

describe('HighwaysService', () => {
  let service: HighwaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighwaysService],
    }).compile();

    service = module.get<HighwaysService>(HighwaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
