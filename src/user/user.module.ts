import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [...userProviders],
})
export class UserModule {}
