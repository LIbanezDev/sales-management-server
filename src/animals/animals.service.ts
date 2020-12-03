import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../db/models/animal.entity';
import { User } from '../db/models/user.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) public readonly animalRepo: Repository<Animal>,
    @InjectRepository(User) public readonly usersRepo: Repository<User>,
  ) {}
}
