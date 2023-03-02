import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The price of the product' })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description:
      'The percent decimal of the products displayed discount off the base price',
    required: false,
    default: 0.0,
  })
  salePctOff: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the product' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The public image url for the image' })
  imgUrl: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The enabled status of the product, optional',
    default: 'true',
    required: false,
  })
  isEnabled: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The categoryId of the product' })
  categoryId: string;
}

export default CreateProductDto;
