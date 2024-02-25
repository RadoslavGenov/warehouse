import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RecordType } from './record-type.enum';

@Entity()
@ObjectType()
export class History {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  amount: number;

  @Column()
  @Field()
  type: RecordType;

  @Column()
  @Field()
  date: Date;
}
