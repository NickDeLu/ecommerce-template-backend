import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { ProductEntity } from '../product.entity';

@Entity('metadata_group')
export class MetadataGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  isOptional: boolean;

  @Column({ nullable: true })
  defaultOptionId: string;

  @ManyToMany(() => ProductEntity, (product) => product.metadataGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  products?: ProductEntity[];

  @OneToMany(
    () => MetadataOption,
    (metadataOption) => metadataOption.metadataGroup,
  )
  metadataOptions?: MetadataOption[];
}

@Entity('metadata_option')
export class MetadataOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  metadataGroupId: string;

  @Type(() => Number)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  title: string;

  @ManyToOne(
    () => MetadataGroup,
    (metadataGroup) => metadataGroup.metadataOptions,
  )
  metadataGroup: MetadataGroup;
}

@Entity('product_metadata')
export class ProductMetadata {
  @PrimaryColumn()
  productId: string;

  @PrimaryColumn()
  metadataGroupId: string;

  @ManyToOne(() => ProductEntity, (product) => product.metadataGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  products: ProductEntity[];

  @ManyToOne(() => MetadataGroup, (metadataGroup) => metadataGroup.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'metadataGroupId', referencedColumnName: 'id' }])
  metadataGroup: MetadataGroup[];
}
