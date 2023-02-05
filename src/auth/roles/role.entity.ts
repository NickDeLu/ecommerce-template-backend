import { UserEntity } from 'src/user/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  role: string;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  user: UserEntity;
}
