import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
