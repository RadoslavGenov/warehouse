import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class Import {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  amount: number;

  @Column()
  @Field()
  date: Date;

  @ManyToOne(() => Product, (product) => product.imports, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Product)
  product: Product;
}
