import { Exclude } from 'class-transformer';
import { AddressEntity } from 'src/address/address.entity';
import { RoleEntity } from 'src/auth/roles/role.entity';
import { PaymentEntity } from 'src/payment/payment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  private password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  @Exclude()
  authConfirmToken: number;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @OneToMany(() => RoleEntity, (role) => role.user)
  @Exclude()
  roles?: RoleEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.user)
  payments?: PaymentEntity[];

  getPassword(): string {
    return this.password;
  }
}
