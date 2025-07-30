import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDto {
  @ApiProperty({ 
    example: 'https://www.example.com/very-long-url-that-needs-to-be-shortened', 
    description: 'The original URL to be shortened' 
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl({}, { message: 'Please provide a valid URL' })
  url: string;
}

export class UrlResponseDto {
  @ApiProperty({ 
    example: 1, 
    description: 'Unique identifier of the shortened URL' 
  })
  id: number;

  @ApiProperty({ 
    example: 'https://www.example.com/very-long-url-that-needs-to-be-shortened', 
    description: 'The original URL' 
  })
  originalUrl: string;

  @ApiProperty({ 
    example: 'abc123', 
    description: 'The short code used in the shortened URL' 
  })
  shortCode: string;

  @ApiProperty({ 
    example: 'https://short.ly/abc123', 
    description: 'The complete shortened URL' 
  })
  shortUrl: string;

  @ApiProperty({ 
    example: 42, 
    description: 'Total number of clicks/redirects' 
  })
  totalClicks: number;

  @ApiProperty({ 
    example: '2024-01-15T10:30:00Z', 
    description: 'When the URL was created' 
  })
  createdAt: Date;

  @ApiProperty({ 
    example: '2024-01-15T10:30:00Z', 
    description: 'When the URL was last updated' 
  })
  updatedAt: Date;

  @ApiProperty({ 
    example: 1, 
    description: 'ID of the user who created this URL (null for anonymous users)',
    required: false,
    nullable: true
  })
  userId?: number;
}
