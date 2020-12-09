import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserResponse } from './types/auth.types';
import { UserRegisterInput } from './dto/register.input';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(@Args('data') data: UserRegisterInput): Promise<UserResponse> {
    try {
      console.log(data);
      /*const userRegistered = await User.findOne({
        where: { email: data.email },
      });
      if (userRegistered) return { ok: false, msg: 'El email ya existe!' };
      const { password, salt } = getEncryptedCredentials(data.password);*/
      /*const imageURL = await uploadFileToGCP(data.image, 'users');
      const user = await User.create({
        ...data,
        description: data.description || '',
        password,
        salt,
        image: imageURL,
      }).save();*/
      return { ok: true, msg: 'Registrado satisfactoriamente!' };
    } catch (e: unknown) {
      return { ok: false, msg: JSON.stringify(e) };
    }
  }
}
