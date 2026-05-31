import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import db from '@/lib/db';
import { usersTable } from '@/lib/db/schema';
import { plainToInstance } from 'class-transformer';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  async createUser(createRequest: CreateUserDto): Promise<UserResponseDto> {
    const [user] = await db
      .insert(usersTable)
      .values({
        name: createRequest.name,
        email: createRequest.email,
      })
      .returning({
        name: usersTable.name,
        email: usersTable.email,
      });

    const response = plainToInstance(UserResponseDto, user);
    return response;
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await db
      .select({
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable);

    const response = plainToInstance(UserResponseDto, users);
    return response;
  }

  async getUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await db
      .select({
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    const response = plainToInstance(UserResponseDto, user[0]);
    return response;
  }
}
