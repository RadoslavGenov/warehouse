import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateWarehouseInput {
  @IsNotEmpty()
  @Field()
  size: number;

  @IsNotEmpty()
  @Field()
  isHazardous: boolean;
}
