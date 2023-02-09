import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The id of the associated user',
    required: false,
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The stripe id of the associated stripe payment method',
    required: false,
  })
  stripePaymentId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The last 4 digits of the payment method card number',
    required: false,
  })
  last4: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The brand of the payment method',
    required: false,
  })
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The month expiry of the payment method',
    required: false,
  })
  expMonth: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The year expiry of the payment method',
    required: false,
  })
  expYear: number;
}

export default UpdatePaymentDto;
