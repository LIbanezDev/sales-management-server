import { Args, GqlExecutionContext, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterArgs } from './dto/register.input';
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '../../db/models/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './types/auth.types';
import { AuthUser } from '../../utils/types/graphql';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  async me(@CurrentUser() user: AuthUser) {
    console.log(user);
    return user.email;
  }

  @Mutation(() => User)
  async register(@Args() data: RegisterArgs): Promise<User> {
    const userRegistered = await this.authService.User.findOne({
      where: { email: data.email },
    });
    if (userRegistered) throw new HttpException('Usuario ya registrado.', HttpStatus.BAD_REQUEST);
    const password = await this.authService.getEncryptedCredentials(data.password);
    return await this.authService.User.create({
      ...data,
      description: data.description || '',
      password,
    }).save();
  }

  @Mutation(() => LoginResponse)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<LoginResponse> {
    // const user = await this.authService.validateUser({ email, password });
    return {
      token: this.authService.getToken({ id: 2, email: 'lucas.vergara@usm.cl', roles: ['ADMIN'] }),
      user: new User(),
    };
  }
}
