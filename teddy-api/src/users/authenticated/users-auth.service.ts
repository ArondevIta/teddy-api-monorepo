import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { BaseService } from '../../common/base.service';

@Injectable()
export class UsersAuthService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async findOneUser(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      const { password, ...userResponse } = user;
      return userResponse as UserResponseDto;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    requestUserId: number
  ): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (user.id !== requestUserId) {
        throw new UnauthorizedException('Acesso negado');
      }

      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.userRepository.findOne({
        where: { id },
      });

      const { password, ...userResponse } = updatedUser;
      return userResponse as UserResponseDto;
    } catch (error) {
      throw error;
    }
  }

  async removeUser(id: number, requestUserId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (user.id !== requestUserId) {
        throw new UnauthorizedException('Acesso negado');
      }

      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      await this.userRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
