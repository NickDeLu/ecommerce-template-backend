import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../user.entity';

export class RequestWithUserDto {
  @IsNotEmpty()
  user: UserEntity;
}

export default RequestWithUserDto;
