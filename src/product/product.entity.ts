import { Exclude, Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MetadataGroup } from './metadata/metadata.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imgUrl: string;

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

  @Type(() => Number)
  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  salePctOff: number;

  @ManyToMany(() => MetadataGroup, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'product_metadata',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'metadataGroupId',
      referencedColumnName: 'id',
    },
  })
  metadataGroups?: MetadataGroup[];

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
