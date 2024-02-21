import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @OneToMany(() => Warehouse, (warehouse) => warehouse.customer)
  @Field(() => [Warehouse])
  warehouses: Warehouse[];
}
