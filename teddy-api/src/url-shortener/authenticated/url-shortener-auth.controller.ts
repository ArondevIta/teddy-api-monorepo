import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ShortenUrlDto } from '../dto/shorten-url.dto';
import { UrlShortenerAuthService } from './url-shortener-auth.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import {
  ApiUpdateShortenedUrl,
  ApiDeleteShortenedUrl,
  ApiGetUserUrls,
} from '../../common/decorators/api-endpoints.decorator';

@ApiTags('URL Shortener - Authenticated')
@ApiBearerAuth('JWT-auth')
@Controller('url-shortener')
@UseGuards(JwtAuthGuard)
export class UrlShortenerAuthController {
  constructor(private readonly service: UrlShortenerAuthService) {}

  @Get('user-urls')
  @ApiGetUserUrls()
  async getUserUrls(@Req() req) {
    return this.service.findByUserId(req.user.id);
  }

  @Patch(':id')
  @ApiUpdateShortenedUrl()
  async updateUrl(@Param('id') id: number, @Body() urlDto: ShortenUrlDto) {
    return this.service.updateById(id, urlDto);
  }

  @Delete(':id')
  @ApiDeleteShortenedUrl()
  async deleteUrl(@Param('id') id: number, @Req() req) {
    return this.service.deleteById(id, req.user.id);
  }
}
