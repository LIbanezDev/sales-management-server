import { Resolver, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsServic: ProductsService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello';
  }
}