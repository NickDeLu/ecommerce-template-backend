import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { paymentProviders } from './payment.providers';
import { PaymentService } from './payment.service';

@Module({
  imports: [DatabaseModule],
  providers: [...paymentProviders, PaymentService],
  exports: [...paymentProviders, PaymentService],
})
export class PaymentModule {}
