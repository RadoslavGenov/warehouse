import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Import } from './import.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  amount: number;

  @Column()
  @Field()
  isHazardous: boolean;

  @Field(() => [Import])
  @OneToMany(() => Import, (importRecord) => importRecord.product, {
    cascade: true,
  })
  imports: Import[];

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.products)
  @Field(() => Warehouse)
  warehouse: Warehouse;
}
