import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AnimalsModule } from './modules/animals/animals.module';
import { DatabaseConfig } from './config/services.config';
import { apolloConfig } from './config/apollo-server.config';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from './config/global.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    AnimalsModule,
    AuthModule,
    GraphQLModule.forRoot(apolloConfig),
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
