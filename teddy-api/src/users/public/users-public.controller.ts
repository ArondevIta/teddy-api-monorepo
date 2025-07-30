import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersPublicService } from './users-public.service';
import { CreateUserDto, UserResponseDto } from '../dto/user.dto';

@ApiTags('Users - Public')
@Controller('users/public')
export class UsersPublicController {
  constructor(private readonly service: UsersPublicService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user account' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.service.createUser(createUserDto);
  }
}
