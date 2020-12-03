import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './entity/product.entity';
import { isNumeric } from 'rxjs/internal-compatibility';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isNumeric(id)) throw new HttpException('Parametro id debe ser un numero.', HttpStatus.BAD_REQUEST);
    const product = await this.productsService.getOne(parseInt(id));
    if (!product) throw new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    return product;
  }

  @Post()
  async createOne(@Body() createProductDto: CreateProductDto): Promise<Product> {
    if (!createProductDto.name || !createProductDto.ownerId || !createProductDto.stock) {
      throw new HttpException('Bad fucking request bro!!!!', HttpStatus.BAD_REQUEST);
    }
    const res = await this.productsService.addProduct(createProductDto);
    if (!res) {
      throw new HttpException('No se pudo crear el producto, el usuario no existe.', HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    if (!isNumeric(id)) throw new HttpException('Parametro id debe ser un numero.', HttpStatus.BAD_REQUEST);
    const product = await this.productsService.deleteOne(parseInt(id));
    if (!product) throw new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    return product;
  }

  @Put(':id')
  async editOne(@Param('id') id: string) {
    if (!isNumeric(id)) throw new HttpException('Parametro id debe ser un numero.', HttpStatus.BAD_REQUEST);

  }
}
