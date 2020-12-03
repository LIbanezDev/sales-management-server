import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async getUsers() {
    return await this.usersService.getAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    const user = await this.usersService.createOne(createUserDto);
    return {
      user,
    };
  }
}
