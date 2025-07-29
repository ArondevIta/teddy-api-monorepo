import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UserResponseDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersPublicService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      withDeleted: true,
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const { password, ...userResponse } = savedUser;
    return userResponse as UserResponseDto;
  }
}
