import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
