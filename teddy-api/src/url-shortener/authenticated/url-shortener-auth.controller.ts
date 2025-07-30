import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ShortenUrlDto } from '../dto/shorten-url.dto';
import { UrlShortenerAuthService } from './url-shortener-auth.service';
import { JwtAuthGuard } from 'teddy-api/src/auth/jwt-auth.guard';

@Controller('url-shortener')
@UseGuards(JwtAuthGuard)
export class UrlShortenerAuthController {
  constructor(private readonly service: UrlShortenerAuthService) {}

  @Patch(':id')
  async updateUrl(@Param('id') id: number, @Body() urlDto: ShortenUrlDto) {
    return this.service.updateById(id, urlDto);
  }

  @Delete(':id')
  async deleteUrl(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
