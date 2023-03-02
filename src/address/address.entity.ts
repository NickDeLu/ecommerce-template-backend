import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeUpdate,
  JoinColumn,
} from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;

  @Column()
  userId: string;

  @Column()
  addressType: 'shipping' | 'billing';

  @Column()
  recipientName: string;

  @Column()
  streetAddress: string;

  @Column()
  city: string;

  @Column()
  stateProvince: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
