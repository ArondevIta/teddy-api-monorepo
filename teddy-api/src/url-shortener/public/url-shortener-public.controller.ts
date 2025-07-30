import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { OptionalJwtAuthGuard } from '../../auth/optional-jwt-auth.guard';
import { ShortenUrlDto } from '../dto/shorten-url.dto';
import { UrlShortenerPublicService } from './url-shortener-public.service';

@Controller('url-shortener/public')
export class UrlShortenerPublicController {
  constructor(private readonly service: UrlShortenerPublicService) {}

  @Post('shorten')
  @UseGuards(OptionalJwtAuthGuard)
  async shortenUrl(@Body() shortenUrlDto: ShortenUrlDto, @Req() req?: any) {
    const user = req?.user || null;

    return this.service.shortenUrl(shortenUrlDto.url, user);
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const originalUrl = await this.service.getOriginalUrlAndTrackClick(
      shortCode
    );
    return res.redirect(originalUrl);
  }
}
