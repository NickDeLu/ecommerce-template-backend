import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import CreateProductDto from './dto/createProduct.dto';
import UpdateProductDto from './dto/updateProduct.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
  ) {}

  getAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  getOneById(id: string): Promise<ProductEntity> {
    return this.productRepository.findOne({ where: { id } });
  }

  getAllByCategory(categoryId: string): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { categoryId } });
  }

  async updateProduct(productId: string, product: UpdateProductDto) {
    return await this.updateHelper(productId, product);
  }

  async setProductEnabledStatus(
    id: string,
    isEnabled: boolean,
  ): Promise<ProductEntity> {
    return await this.updateHelper(id, { isEnabled });
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return await this.productRepository.delete({ id });
  }

  createProduct(productData: CreateProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(productData);
    return this.productRepository.save(newProduct);
  }

  /**
   * activates before update database trigger for typeorm so that updatedAt field can be set
   * @param productId the id of the product to update
   * @param updates the json object with fields of which are to be updated
   * @returns updated entity
   */
  private async updateHelper(productId: string, updates: {}) {
    const foundEntity = await this.productRepository.findOne({
      where: { id: productId },
    });
    return await this.productRepository.save(
      Object.assign(foundEntity, updates),
    );
  }
}
