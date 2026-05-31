import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  async getHello() {
    const users = await this.appService.getUsers();
    return users;
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.appService.createUser(createUserDto);
    return user;
  }
}
