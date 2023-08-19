import { Exclude } from 'class-transformer';
import { ProductEntity } from '../product.entity';
import { MetadataGroup } from '../metadata/metadata.entity';

export class ProductDto extends ProductEntity {
  @Exclude()
  isEnabled: boolean;

  @Exclude()
  metadataGroups: MetadataGroup[];

  photoUrls: [];
}
