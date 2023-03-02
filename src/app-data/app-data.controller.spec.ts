import { Test, TestingModule } from '@nestjs/testing';
import { AppDataController } from './app-data.controller';

describe('AppDataController', () => {
  let controller: AppDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppDataController],
    }).compile();

    controller = module.get<AppDataController>(AppDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
