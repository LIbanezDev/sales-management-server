import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { RegisterArgs } from './dto/register.input';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '../../db/models/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './types/auth.types';
import { AuthUser } from '../../utils/types/graphql';
import { JwtAuthGraphQL } from './guards/jwt-auth.guard';
import { CurrentUserGQL } from './decorators/current-user.decorators';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @ResolveField()
  age(@Root() user: User) {
    let diff = (Date.now() - user.bornDate.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.trunc(diff / 365.25));
  }

  @UseGuards(JwtAuthGraphQL)
  @Query(() => User)
  async me(@CurrentUserGQL() user: AuthUser) {
    return this.authService.User.findOne(user.id, {
      relations: ['products', 'animals'],
    });
  }

  @Mutation(() => User)
  async register(@Args() data: RegisterArgs): Promise<User> {
    const userRegistered = await this.authService.User.findOne({
      where: { email: data.email },
    });
    if (userRegistered) throw new HttpException('Usuario ya registrado.', HttpStatus.BAD_REQUEST);
    const password = await this.authService.getEncryptedCredentials(data.password);
    return this.authService.User.create({
      ...data,
      description: data.description || '',
      password,
    }).save();
  }

  @Mutation(() => LoginResponse)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<LoginResponse> {
    const user = await this.authService.validateUser({ email, password });
    const roles = user.email === 'lucas.vergara@usm.cl' ? ['ADMIN'] : ['USER'];
    return {
      token: this.authService.getToken({ id: user.id, email: user.email, roles }),
      user,
    };
  }
}
