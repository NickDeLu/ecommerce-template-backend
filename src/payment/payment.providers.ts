import { DataSource } from 'typeorm';
import { PaymentEntity } from './payment.entity';

export const paymentProviders = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PaymentEntity),
    inject: ['DATA_SOURCE'],
  },
];
