import { Field, InputType, Int } from '@nestjs/graphql';
import { ANIMAL_TYPE } from '../../../db/models/animal.entity';

@InputType()
export class CreateAnimalInput {
  @Field()
  name: string;

  @Field(() => ANIMAL_TYPE)
  type: ANIMAL_TYPE;

  @Field(() => Int)
  ownerId: number;
}
