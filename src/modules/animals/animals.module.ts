import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from '../../db/models/animal.entity';
import { User } from '../../db/models/user.entity';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, User])],
  providers: [
    AnimalsResolver,
    AnimalsService,
    {
      provide: 'PUB_SUB',
      useFactory: () =>
        new RedisPubSub({
          publisher: new Redis(process.env.REDIS_URI || 'redis://redis:6379'),
          subscriber: new Redis(process.env.REDIS_URI || 'redis://redis:6379'),
        }),
    },
  ],
})
export class AnimalsModule {}
