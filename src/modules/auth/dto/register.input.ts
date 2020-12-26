import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

export enum AUTH_APPS {
  Google,
  GitHub,
}

registerEnumType(AUTH_APPS, {
  name: 'EXTERNAL_AUTH_APPS', // this one is mandatory
  description: 'External auth apps like GitHub or Google', // this one is optional
});

@ArgsType()
export class RegisterArgs {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: false })
  bornDate: Date;
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
