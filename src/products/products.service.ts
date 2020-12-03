import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  async addProduct(data: CreateProductDto): Promise<Product | null> {
    const user = await this.usersService.getOne(data.ownerId);
    if (!user) return null;
    return this.productsRepository.save({
      name: data.name,
      stock: data.stock,
      user,
    });
  }

  getAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['user'],
    });
  }

  async getOne(id: number): Promise<Product | null> {
    return (await this.productsRepository.findOne(id)) || null;
  }

  async deleteOne(id: number): Promise<Product | null> {
    const product = await this.productsRepository.findOne(id);
    if (!product) return null;
    return this.productsRepository.remove(product);
  }
}
