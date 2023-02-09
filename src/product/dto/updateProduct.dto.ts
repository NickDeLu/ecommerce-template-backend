import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The price of the product', required: false })
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The name of the product', required: false })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the product',
    required: false,
  })
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The enabled status of the product',
    default: 'true',
    required: false,
  })
  isEnabled: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The categoryId of the product',
    required: false,
  })
  categoryId: string;
}

export default UpdateProductDto;
