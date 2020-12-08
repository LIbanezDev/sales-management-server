import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('End to End Test (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: 'postgres://postgres:123456@localhost:5432/nest_rest_test',
          entities: ['./!**!/!*.entity.ts'],
          synchronize: true,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('UsersModule', () => {
    const httpServer = app.getHttpServer();
    it('/', async () => {
      const res = await request(httpServer).get('/users').expect(200);
      const users = res.body;
      console.log(users);
      expect(users).toHaveLength(3);
    });
  });
});
