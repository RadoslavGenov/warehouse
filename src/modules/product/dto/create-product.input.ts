import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  readonly name: string;

  @IsNotEmpty()
  @Field()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  readonly description: string;

  @IsNotEmpty()
  @Field()
  readonly isHazardous: boolean;
}
