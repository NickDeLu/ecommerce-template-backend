import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email for the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).+$/, {
    message:
      'Password must contain at least one capital letter, one special character, and one number',
  })
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}

export default RegisterUserDto;
