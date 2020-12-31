import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from '../../db/models/product.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../../utils/types/graphql';

@ApiTags('Products')
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/products')
  async getAll(@Query('limit', ParseIntPipe) limit: number): Promise<Product[]> {
    return await this.productsService.productsRepo.find({
      take: limit || 10,
    });
  }

  @Get('/getcache')
  getCache(@Param() key: string) {
    return this.productsService.getCache(key);
  }

  @Post('setcache')
  setCache(@Body() key: string, value: string) {
    return this.productsService.setCache(key, value, 10000);
  }

  @Get('/products/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.productsRepo.findOne(id);
    if (!product) throw new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    return product;
  }

  @UseGuards(JwtAuth)
  @Post('/products')
  @ApiBearerAuth('BearerJWT')
  async createOne(@Body() createProductDto: CreateProductDto, @CurrentUser() user: AuthUser): Promise<Product> {
    if (!createProductDto.name || !createProductDto.stock) {
      throw new HttpException('Bad fucking request bro!', HttpStatus.BAD_REQUEST);
    }
    return this.productsService.productsRepo
      .create({
        ...createProductDto,
        user: await this.productsService.usersRepo.findOne(user.id),
      })
      .save();
  }

  @UseGuards(JwtAuth)
  @Delete('/products/:id')
  @ApiBearerAuth('BearerJWT')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.productsRepo.delete({
      id,
    });
    if (!product) throw new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    return true;
  }

  @UseGuards(JwtAuth)
  @Put('/products/:id')
  @ApiBearerAuth('BearerJWT')
  async editOne(@Param('id', ParseIntPipe) id: number) {
    return true;
  }
}
