import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.userService.getAllUsers(page, limit);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }
}
