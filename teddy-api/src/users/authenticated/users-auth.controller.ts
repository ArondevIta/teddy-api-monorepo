import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Request,
} from '@nestjs/common';
import { UsersAuthService } from './users-auth.service';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersAuthController {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  @Get('me')
  async getMe(@Request() req): Promise<UserResponseDto> {
    return this.usersAuthService.findOneUser(req.user.id);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersAuthService.findAllUsers();
  }

  @Get('deleted')
  async findDeleted(): Promise<UserResponseDto[]> {
    return this.usersAuthService.findDeletedUsers();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserResponseDto> {
    return this.usersAuthService.findOneUser(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    return this.usersAuthService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersAuthService.removeUser(id);
  }

  @Post(':id/restore')
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserResponseDto> {
    return this.usersAuthService.restoreUser(id);
  }
}
