import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateMetaDataOptionDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    description: 'The title of the metadata option',
  })
  title: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    description: 'The price of the option to be added in addition',
  })
  price: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    description: 'The id of the associated metadata group',
  })
  metadataGroupId: string;
}
