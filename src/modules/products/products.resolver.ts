import { Resolver, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { UsersService } from '../users/users.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService, private readonly usersService: UsersService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    console.log(await this.usersService.usersRepository.find());
    return 'Hello';
  }
}
