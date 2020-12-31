import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { DatabaseConfig } from './config/services.config';
import { apolloConfig } from './config/apollo-server.config';
import { globalConfig } from './config/global.config';
import { AnimalsModule, AuthModule, HealthModule, ProductsModule, UsersModule } from './modules';
import { MicroModule } from './modules/micro/micro.module';

@Module({
  imports: [
    ProductsModule,
    HealthModule,
    UsersModule,
    AnimalsModule,
    AuthModule,
    MicroModule,
    GraphQLModule.forRoot(apolloConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
      exclude: ['/api*', '/graphql'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
