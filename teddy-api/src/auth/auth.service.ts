import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from '../entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { LoginDto } from './dto/auth.dto';
import { RefreshTokenDto, TokenResponseDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto
  ): Promise<TokenResponseDto> {
    const { refreshToken } = refreshTokenDto;

    // Find and validate refresh token
    const storedToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken, isRevoked: false },
      relations: ['user'],
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      await this.refreshTokenRepository.update(storedToken.id, {
        isRevoked: true,
      });
      throw new UnauthorizedException('Refresh token expired');
    }

    // Revoke old token
    await this.refreshTokenRepository.update(storedToken.id, {
      isRevoked: true,
    });

    // Generate new tokens
    const tokens = await this.generateTokens(storedToken.user);

    return {
      ...tokens,
      user: {
        id: storedToken.user.id,
        email: storedToken.user.email,
        name: storedToken.user.name,
      },
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { token: refreshToken },
      { isRevoked: true }
    );
  }

  private async generateTokens(
    user: User
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Generate access token
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    // Generate refresh token
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    // Save refresh token to database
    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: refreshToken,
      user,
      userId: user.id,
      expiresAt,
    });

    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }
}
