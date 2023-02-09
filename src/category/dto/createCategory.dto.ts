import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the category',
  })
  description: string;
}

export default CreateCategoryDto;
