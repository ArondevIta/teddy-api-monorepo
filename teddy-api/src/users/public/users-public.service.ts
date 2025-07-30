import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UserResponseDto } from '../dto/user.dto';
import { EnvConfig } from '../../config/env.config';
import { BaseService } from '../../common/base.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersPublicService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService<EnvConfig>
  ) {
    super(userRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      withDeleted: true,
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const saltRounds = this.configService.get('BCRYPT_SALT_ROUNDS');
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
