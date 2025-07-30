import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortenerPublicController } from './public/url-shortener-public.controller';
import { UrlShortenerPublicService } from './public/url-shortener-public.service';
import { UrlShortenerAuthController } from './authenticated/url-shortener-auth.controller';
import { UrlShortenerAuthService } from './authenticated/url-shortener-auth.service';
import { Url } from '../entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlShortenerPublicController, UrlShortenerAuthController],
  providers: [UrlShortenerPublicService, UrlShortenerAuthService],
  exports: [],
})
export class UrlShortenerModule {}
