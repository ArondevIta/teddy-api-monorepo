import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';

@Injectable()
export class UsersAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      const { password, ...userResponse } = user;
      return userResponse as UserResponseDto;
    });
  }

  async findDeletedUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      withDeleted: true,
      where: { deletedAt: { not: null } } as any,
    });
    return users.map((user) => {
      const { password, ...userResponse } = user;
      return userResponse as UserResponseDto;
    });
  }

  async findOneUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const { password, ...userResponse } = user;
    return userResponse as UserResponseDto;
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    const { password, ...userResponse } = updatedUser;
    return userResponse as UserResponseDto;
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    await this.userRepository.softDelete(id);
  }

  async restoreUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    await this.userRepository.restore(id);
    const restoredUser = await this.userRepository.findOne({
      where: { id },
    });

    const { password, ...userResponse } = restoredUser;
    return userResponse as UserResponseDto;
  }
}
