import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { DatabaseModule } from 'src/database/database.module';
import { PaymentModule } from 'src/payment/payment.module';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, AddressModule, PaymentModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [...userProviders],
})
export class UserModule {}
