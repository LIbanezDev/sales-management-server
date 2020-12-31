import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../db/models/product.entity';
import { Repository } from 'typeorm';
import { User } from '../../db/models/user.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) public readonly productsRepo: Repository<Product>,
    @InjectRepository(User) public readonly usersRepo: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}
  async getCache(key: string): Promise<string> {
    try {
      return this.cache.get('test');
    } catch (e: unknown) {
      return 'No existe la key' + key;
    }
  }
  async setCache(key: string, value: string, ttl: number): Promise<boolean> {
    try {
      await this.cache.set(key, value, { ttl });
      return true;
    } catch (e: unknown) {
      return false;
    }
  }
}
