import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import CreateProductDto from './dto/createProduct.dto';
import { ProductDto } from './dto/product.dto';
import setProductMetadataDto from './dto/setProductMetadata.dto';
import UpdateProductDto from './dto/updateProduct.dto';
import { MetadataService } from './metadata/metadata.service';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly authService: AuthService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post('setmetadata')
  setProductMetadata(@Body() body: setProductMetadataDto) {
    return this.productService.setProductMetaData(body);
  }

  @ApiQuery({ name: 'categoryId', type: 'string', required: false })
  @Get()
  async getProducts(@Query('categoryId') catId: string = null) {
    if (catId) {
      return plainToInstance(
        ProductDto,
        (await this.productService.getAllByCategory(catId)).filter(
          (product) => product.isEnabled,
        ),
      );
    } else {
      return plainToInstance(
        ProductDto,
        (await this.productService.getAll()).filter(
          (product) => product.isEnabled,
        ),
      );
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiQuery({ name: 'categoryId', type: 'string', required: false })
  @Get('detailed')
  async getProductsDetailed(@Query('categoryId') catId: string = null) {
    if (catId) {
      return plainToInstance(
        ProductEntity,
        await this.productService.getAllByCategory(catId),
      );
    } else {
      return plainToInstance(ProductEntity, await this.productService.getAll());
    }
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return plainToInstance(ProductDto, this.productService.getOneById(id));
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return plainToClass(
      ProductEntity,
      this.productService.createProduct(product),
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return plainToClass(
      ProductEntity,
      this.productService.updateProduct(id, product),
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
