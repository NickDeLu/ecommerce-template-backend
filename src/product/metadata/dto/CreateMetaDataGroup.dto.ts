import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateMetaDataGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'The title of the metadata group of options',
  })
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    default: false,
    description: 'The optional status of the metadata options',
  })
  isOptional: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description:
      'The id of a metadata option entity to represent the default option for the group',
    required: false,
  })
  defaultOptionId: string;
}
