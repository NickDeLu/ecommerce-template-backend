import { Test, TestingModule } from '@nestjs/testing';
import { AppDataService } from './app-data.service';

describe('AppDataService', () => {
  let service: AppDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppDataService],
    }).compile();

    service = module.get<AppDataService>(AppDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
