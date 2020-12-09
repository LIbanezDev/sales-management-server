import { Field, ObjectType } from '@nestjs/graphql';
import { IMutationResponse } from '../../global/responses/Mutation.response';
import { User } from '../../../db/models/user.entity';

@ObjectType({ implements: IMutationResponse })
export class UserResponse extends IMutationResponse {
  @Field({ nullable: true })
  user?: User;
}

@ObjectType({ implements: IMutationResponse })
export class LoginResponse extends IMutationResponse {
  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  token?: string;
}
