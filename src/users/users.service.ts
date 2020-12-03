import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getOne(id: number): Promise<User | null> {
    return (await this.usersRepository.findOne(id)) || null;
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['products'],
    });
  }

  async createOne(createUserDto: CreateUserDto) {
    return await this.usersRepository.save({
      ...createUserDto,
    });
  }
}
