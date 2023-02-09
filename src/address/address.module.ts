import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { addressProviders } from './address.providers';
import { AddressService } from './address.service';

@Module({
  imports: [DatabaseModule],
  providers: [...addressProviders, AddressService],
  exports: [...addressProviders, AddressService],
})
export class AddressModule {}
