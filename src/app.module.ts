import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AnimalsModule } from './animals/animals.module';
import { DatabaseConfig } from './config/database.config';
import { apolloConfig } from './config/apollo-server.config';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ProductsModule,
    UsersModule,
    AnimalsModule,
    GraphQLModule.forRoot(apolloConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
