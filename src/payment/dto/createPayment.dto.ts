import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the associated user' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The stripe id of the associated stripe payment method',
  })
  stripePaymentId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The last 4 digits of the payment method card number',
  })
  last4: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The brand of the payment method' })
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The month expiry of the payment method' })
  expMonth: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The year expiry of the payment method' })
  expYear: number;
}

export default CreatePaymentDto;
