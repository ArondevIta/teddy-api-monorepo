import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (minimum 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name (minimum 2 characters)' })
  @IsString()
  @MinLength(2)
  name: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user@example.com', description: 'User email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123', description: 'User password (minimum 6 characters)' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: 'John Smith', description: 'User full name (minimum 2 characters)' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'User unique identifier' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  name: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'User creation timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'User last update timestamp' })
  updatedAt: Date;
}
