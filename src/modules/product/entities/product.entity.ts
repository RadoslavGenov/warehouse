import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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
  isHazardous: boolean;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.products)
  @Field(() => Warehouse)
  warehouse: Warehouse;
}
