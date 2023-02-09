import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  getAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  getOneById(id: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async updateCategory(categoryId: string, category: UpdateCategoryDto) {
    return await this.updateHelper(categoryId, category);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return await this.categoryRepository.delete({ id });
  }

  createCategory(categoryData: CreateCategoryDto): Promise<CategoryEntity> {
    const newCategory = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(newCategory);
  }

  /**
   * activates before update database trigger for typeorm so that updatedAt field can be set
   * @param categoryId the id of the category to update
   * @param updates the json object with fields of which are to be updated
   * @returns updated entity
   */
  private async updateHelper(categoryId: string, updates: {}) {
    const foundEntity = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    return await this.categoryRepository.save(
      Object.assign(foundEntity, updates),
    );
  }
}
