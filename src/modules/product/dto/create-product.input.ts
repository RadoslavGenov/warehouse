import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  name: string;

  @IsNotEmpty()
  @Field()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  description: string;

  @IsNotEmpty()
  @Field()
  isHazardous: boolean;

  @IsNotEmpty()
  @Field()
  amount: number;
}
