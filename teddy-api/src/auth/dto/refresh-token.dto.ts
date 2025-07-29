import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class TokenResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
