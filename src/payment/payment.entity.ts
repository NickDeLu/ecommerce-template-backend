import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;

  @Column()
  userId: string;

  @Column()
  stripePaymentId: string;

  @Column()
  last4: string;

  @Column()
  brand: string;

  @Column()
  expMonth: number;

  @Column()
  expYear: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
