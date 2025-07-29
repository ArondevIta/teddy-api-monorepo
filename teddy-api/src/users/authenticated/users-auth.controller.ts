import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { UsersAuthService } from './users-auth.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersAuthController {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  @Get('me')
  async getMe(@Req() req): Promise<UserResponseDto> {
    return this.usersAuthService.findOneUser(req.user.id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ): Promise<UserResponseDto> {
    return this.usersAuthService.updateUser(id, updateUserDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<void> {
    return this.usersAuthService.removeUser(id, req.user.id);
  }
}
