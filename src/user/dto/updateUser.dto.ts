import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The email of the user', required: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The first name of the user', required: false })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The lat name of the user', required: false })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The password of the user', required: false })
  password: string;
}

export default UpdateUserDto;
