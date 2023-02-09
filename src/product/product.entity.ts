import { Exclude, Type } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isEnabled: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Type(() => Number)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  categoryId: string;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
