import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';

describe('UserController', () => {
  let controller: UsersController;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
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
    controller = module.get<UsersController>(UsersController);
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    const users = await controller.getUsers();
    console.log(users);
    expect(users).toHaveLength(0);
  });
});
