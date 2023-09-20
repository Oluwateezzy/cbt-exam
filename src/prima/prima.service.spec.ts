import { Test, TestingModule } from '@nestjs/testing';
import { PrimaService } from './prima.service';

describe('PrimaService', () => {
  let service: PrimaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrimaService],
    }).compile();

    service = module.get<PrimaService>(PrimaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
