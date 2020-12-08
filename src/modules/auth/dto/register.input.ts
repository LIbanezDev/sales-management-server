import { GraphQLUpload } from 'apollo-server-express';
import { Upload } from '../../../utils/types/graphql';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum AUTH_APPS {
  Google,
  GitHub,
}

registerEnumType(AUTH_APPS, {
  name: 'EXTERNAL_AUTH_APPS', // this one is mandatory
  description: 'External auth apps like GitHub or Google', // this one is optional
});

@InputType({ description: 'Informacion necesaria para crear nuevos usuarios' })
export class UserRegisterInput {
  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: false })
  email!: string;

  @Field(() => String, { nullable: true, defaultValue: true })
  description!: string | null;

  @Field({ nullable: true })
  password!: string;

  @Field({ nullable: false })
  bornDate!: Date;

  @Field(() => GraphQLUpload || Boolean, { nullable: true })
  image?: Upload;
}

@InputType({
  description: 'Datos necesarios para ingresar mediante una aplicacion externa como GitHub o Google',
})
export class SocialRegisterInput {
  @Field({ nullable: false })
  token!: string;

  @Field(() => AUTH_APPS)
  type!: AUTH_APPS;
}
