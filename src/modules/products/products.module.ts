import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from '../../db/models/product.entity';
import { LoggerMiddleware } from './logger.middleware';
import { ProductsResolver } from './products.resolver';
import { User } from '../../db/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  providers: [ProductsService, ProductsResolver],
  controllers: [ProductsController],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('products');
  }
}
