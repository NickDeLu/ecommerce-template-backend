import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateMetaDataOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'The title of the metadata option',
  })
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'The price of the option to be added in addition',
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the associated metadata group',
    required: true,
  })
  metadataGroupId: string;
}
