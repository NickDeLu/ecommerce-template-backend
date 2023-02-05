import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The secure code sent to the request user's email address",
  })
  code: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the user' })
  userId: string;
}

export default VerifyUserDto;
