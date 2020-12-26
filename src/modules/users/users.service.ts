import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../db/models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public readonly usersRepo: Repository<User>,
  ) {}
}
