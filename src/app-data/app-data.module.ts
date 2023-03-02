import { Module } from '@nestjs/common';
import { AppDataController } from './app-data.controller';
import { AppDataService } from './app-data.service';

@Module({
  controllers: [AppDataController],
  providers: [AppDataService]
})
export class AppDataModule {}
