import { DataSource } from 'typeorm';
import { MetadataGroup, ProductMetadata } from './metadata/metadata.entity';
import { MetadataOption } from './metadata/metadata.entity';
import { ProductEntity } from './product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_METADATA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductMetadata),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'METADATA_GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MetadataGroup),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'METADATA_OPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MetadataOption),
    inject: ['DATA_SOURCE'],
  },
];
