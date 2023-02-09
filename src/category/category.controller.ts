import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import CreateProductDto from 'src/product/dto/createProduct.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return plainToInstance(CategoryEntity, this.categoryService.getAll());
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  getCategory(@Param('id') id: string) {
    return plainToInstance(CategoryEntity, this.categoryService.getOneById(id));
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post()
  createProduct(@Body() category: CreateCategoryDto) {
    return plainToClass(
      CategoryEntity,
      this.categoryService.createCategory(category),
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return plainToClass(
      ProductEntity,
      this.categoryService.updateCategory(id, category),
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
