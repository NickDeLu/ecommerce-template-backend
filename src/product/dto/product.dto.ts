import { Exclude } from 'class-transformer';
import { ProductEntity } from '../product.entity';

export class ProductDto extends ProductEntity {
  @Exclude()
  isEnabled: boolean;

  photoUrls: [];
}
