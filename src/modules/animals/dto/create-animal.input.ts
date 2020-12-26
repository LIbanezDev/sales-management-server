import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ANIMAL_TYPE } from '../../../db/models/animal.entity';
import { Min, MinLength } from 'class-validator';

@ArgsType()
export class CreateAnimalInput {
  @Field()
  @MinLength(4)
  name: string;

  @Field()
  @Min(18)
  age: number;

  @Field(() => ANIMAL_TYPE)
  type: ANIMAL_TYPE;

  @Field(() => Int)
  ownerId: number;
}
