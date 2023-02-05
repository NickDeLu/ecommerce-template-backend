import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email for the user' })
  email: string;

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

export default LoginUserDto;
