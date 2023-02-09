import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the associated user' })
  userId: string;

  @IsEnum(['shipping', 'billing'])
  @IsNotEmpty()
  @ApiProperty({ description: 'The address type of the address' })
  addressType: 'shipping' | 'billing';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The recipient name of the order' })
  recipientName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The street address of the address' })
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The city of the address' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The state or province of the address' })
  stateProvince: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The zipCode of the address' })
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The country of the address' })
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The phone number of the order recipient' })
  phoneNumber: string;
}

export default CreateAddressDto;
