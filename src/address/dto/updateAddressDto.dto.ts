import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The id of the associated user',
    required: false,
  })
  userId: string;

  @IsEnum(['shipping', 'billing'])
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The address type of the address',
    required: false,
  })
  addressType: 'shipping' | 'billing';

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The recipient name of the order',
    required: false,
  })
  recipientName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The street address of the address',
    required: false,
  })
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The city of the address', required: false })
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The state or province of the address',
    required: false,
  })
  stateProvince: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The zipCode of the address', required: false })
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The country of the address', required: false })
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the order recipient',
    required: false,
  })
  phoneNumber: string;
}

export default UpdateAddressDto;
