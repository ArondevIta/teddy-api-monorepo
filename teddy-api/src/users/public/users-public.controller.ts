import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersPublicService } from './users-public.service';
import { CreateUserDto, UserResponseDto } from '../dto/user.dto';

@Controller('users/public')
export class UsersPublicController {
  constructor(private readonly service: UsersPublicService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.service.createUser(createUserDto);
  }
}
