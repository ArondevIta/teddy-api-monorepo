import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 
    description: 'Refresh token for obtaining new access token' 
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class TokenResponseDto {
  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 
    description: 'JWT access token for API authentication' 
  })
  accessToken: string;

  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 
    description: 'Refresh token for obtaining new access tokens' 
  })
  refreshToken: string;

  @ApiProperty({ 
    description: 'User information',
    example: {
      id: 1,
      email: 'user@example.com',
      name: 'John Doe'
    }
  })
  user: {
    id: number;
    email: string;
    name: string;
  };
}
