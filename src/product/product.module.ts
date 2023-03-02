import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MetadataService } from './metadata/metadata.service';
import { MetadataController } from './metadata/metadata.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ProductService, MetadataService],
  exports: [...productProviders],
  controllers: [ProductController, MetadataController],
})
export class ProductModule {}
