import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { ProductsModule } from './products.module';

describe('ProductController', () => {
  let productController: ProductsController;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456',
          database: 'nest_rest_test',
          entities: ['./**/*.entity.ts'],
          synchronize: true,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    productController = module.get<ProductsController>(ProductsController);
  });

  afterAll(() => {
    app.close();
  });

  describe('root', () => {
    it('should return an array of products', () => {
      expect(productController.getAll(0)).resolves.toHaveLength(0);
    });
  });
});
