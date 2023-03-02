import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMetaDataGroupDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    description: 'The title of the metadata group of options',
  })
  title: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    default: false,
    description: 'The optional status of the metadata options',
  })
  isOptional: boolean;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    description:
      'The id of a metadata option entity to represent the default option for the group',
  })
  defaultOptionId: string;
}
