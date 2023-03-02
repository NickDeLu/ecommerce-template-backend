import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class setProductMetadataDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The id of the product', required: false })
  productId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The id of the metadata group', required: false })
  metadataGroupId: string;
}

export default setProductMetadataDto;
