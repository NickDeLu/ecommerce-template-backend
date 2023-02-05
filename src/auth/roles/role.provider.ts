import { DataSource } from 'typeorm';
import { RoleEntity } from './role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleEntity),
    inject: ['DATA_SOURCE'],
  },
];
