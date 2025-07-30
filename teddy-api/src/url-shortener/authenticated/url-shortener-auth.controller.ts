import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ShortenUrlDto } from '../dto/shorten-url.dto';
import { UrlShortenerAuthService } from './url-shortener-auth.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import {
  ApiUpdateShortenedUrl,
  ApiDeleteShortenedUrl,
} from '../../common/decorators/api-endpoints.decorator';

@ApiTags('URL Shortener - Authenticated')
@ApiBearerAuth('JWT-auth')
@Controller('url-shortener')
@UseGuards(JwtAuthGuard)
export class UrlShortenerAuthController {
  constructor(private readonly service: UrlShortenerAuthService) {}

  @Patch(':id')
  @ApiUpdateShortenedUrl()
  async updateUrl(@Param('id') id: number, @Body() urlDto: ShortenUrlDto) {
    return this.service.updateById(id, urlDto);
  }

  @Delete(':id')
  @ApiDeleteShortenedUrl()
  async deleteUrl(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
