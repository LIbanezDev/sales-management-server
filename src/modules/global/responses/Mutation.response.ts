import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@ObjectType()
class MutationError {
  @Field()
  path: string;

  @Field()
  msg: string;
}

@InterfaceType()
export class IMutationResponse {
  @Field()
  ok: boolean;

  @Field({ nullable: true })
  msg?: string;

  @Field(() => [MutationError], { nullable: true })
  errors?: MutationError[];
}
