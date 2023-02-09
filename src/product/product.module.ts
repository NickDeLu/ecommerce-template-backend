import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ProductService],
  exports: [...productProviders],
  controllers: [ProductController],
})
export class ProductModule {}
