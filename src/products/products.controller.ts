import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from '../db/models/product.entity';
import { UsersService } from '../users/users.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Query('limit', ParseIntPipe) limit: number): Promise<Product[]> {
    return await this.productsService.productsRepo.find({
      take: limit || 10,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.productsRepo.findOne(id);
    if (!product) throw new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    return product;
  }

  @Post()
  async createOne(@Body() createProductDto: CreateProductDto): Promise<Product> {
    if (!createProductDto.name || !createProductDto.ownerId || !createProductDto.stock) {
      throw new HttpException('Bad fucking request bro!!!!', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.usersRepository.findOne(createProductDto.ownerId);
    if (!user) {
      throw new HttpException('No se pudo crear el producto, el usuario no existe.', HttpStatus.BAD_REQUEST);
    }
    return await this.productsService.productsRepo.create({
      ...createProductDto,
      user,
    });
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.productsRepo.delete({
      id,
    });
    if (!product) throw new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    return true;
  }

  @Put(':id')
  async editOne(@Param('id', ParseIntPipe) id: number) {
    return true;
  }
}
