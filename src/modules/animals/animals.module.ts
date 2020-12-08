import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from '../../db/models/animal.entity';
import { User } from '../../db/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, User])],
  providers: [AnimalsResolver, AnimalsService],
})
export class AnimalsModule {}
