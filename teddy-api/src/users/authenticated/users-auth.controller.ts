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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { UsersAuthService } from './users-auth.service';
import {
  ApiGetUserProfile,
  ApiUpdateUserProfile,
  ApiDeleteUserAccount,
} from '../../common/decorators/api-endpoints.decorator';

@ApiTags('Users - Authenticated')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersAuthController {
  constructor(private readonly service: UsersAuthService) {}

  @Get('me')
  @ApiGetUserProfile()
  async getMe(@Req() req): Promise<UserResponseDto> {
    return this.service.findOneUser(req.user.id);
  }

  @Patch(':id')
  @ApiUpdateUserProfile()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ): Promise<UserResponseDto> {
    return this.service.updateUser(id, updateUserDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteUserAccount()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<void> {
    return this.service.removeUser(id, req.user.id);
  }
}
