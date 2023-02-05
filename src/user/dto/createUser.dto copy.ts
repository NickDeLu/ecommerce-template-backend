import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../user.entity';

export class RequestWithUser {
  @IsNotEmpty()
  user: UserEntity;
}

export default RequestWithUser;
