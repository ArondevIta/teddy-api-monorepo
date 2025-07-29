import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { UrlShortenerService } from './url-shortener.service';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('shorten')
  @UseGuards(OptionalJwtAuthGuard)
  async shortenUrl(@Body() shortenUrlDto: ShortenUrlDto, @Req() req?: any) {
    const user = req?.user || null;

    return this.urlShortenerService.shortenUrl(shortenUrlDto.url, user);
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const originalUrl =
      await this.urlShortenerService.getOriginalUrlAndTrackClick(shortCode);
    return res.redirect(originalUrl);
  }
}
