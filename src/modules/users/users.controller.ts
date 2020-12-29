import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuth)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @Get()
  @ApiBearerAuth('BearerJWT')
  async getUsers() {
    return await this.usersService.usersRepo.find({
      relations: ['animals', 'products'],
    });
  }
}
