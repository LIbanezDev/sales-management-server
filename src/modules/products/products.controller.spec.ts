import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products.module';
import { INestApplication } from '@nestjs/common';

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
          dropSchema: true,
          synchronize: true,
          autoLoadEntities: true,
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
    it('should return an array of products', async () => {
      const res = await productController.getAll();
      expect(res).toHaveLength(0);
    });
  });
});
