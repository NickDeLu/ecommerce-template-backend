import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, IsJSON } from 'class-validator';

export class AppDataDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The appData json for the linked frontend application',
  })
  appData: any;
}

export default AppDataDto;
