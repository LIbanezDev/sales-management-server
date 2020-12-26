import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../db/models/user.entity';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  token?: string;
}
