import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import db from './lib/db';
import { usersTable } from './lib/db/schema';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class AppService {
  async getUsers(): Promise<UserResponseDto[]> {
    var users = await db.select().from(usersTable);
    const response = plainToInstance(UserResponseDto, users);
    return response;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const [user] = await db
      .insert(usersTable)
      .values({
        name: createUserDto.name,
        email: createUserDto.email,
      })
      .returning();
    return plainToInstance(UserResponseDto, user);
  }
}
