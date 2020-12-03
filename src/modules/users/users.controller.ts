import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../../db/models/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.usersRepository.find({
      relations: ['animals', 'products'],
    });
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    const user = await this.usersService.usersRepository.create(createUserDto);
    return {
      user,
    };
  }
}
