import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Customer } from '../../customer/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
@ObjectType()
export class Warehouse {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  size: number;

  @Field()
  @Column()
  remainingSpace: number;

  @Column()
  @Field()
  isHazardous: boolean;

  @ManyToOne(() => Customer, (customer) => customer.warehouses)
  @Field(() => Customer)
  customer: Customer;

  @OneToMany(() => Product, (product) => product.warehouse, { cascade: true })
  @Field(() => [Product])
  products: Product[];
}
