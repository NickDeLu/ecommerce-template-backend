import { DataSource } from 'typeorm';
import { AddressEntity } from './address.entity';

export const addressProviders = [
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AddressEntity),
    inject: ['DATA_SOURCE'],
  },
];
