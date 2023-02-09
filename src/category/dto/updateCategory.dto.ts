import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The name of the category', required: false })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the category',
    required: false,
  })
  description: string;
}

export default UpdateCategoryDto;
