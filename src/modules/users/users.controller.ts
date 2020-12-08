import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../../db/models/user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @Get()
  async getUsers() {
    return await this.usersService.usersRepository.find({
      relations: ['animals', 'products'],
    });
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Crear un nuevo usuario', type: User })
  @ApiBody({ description: 'Informacion necesaria para crear un nuevo usuario', required: true, type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    const user = await this.usersService.usersRepository.create(createUserDto);
    return {
      user,
    };
  }
}
