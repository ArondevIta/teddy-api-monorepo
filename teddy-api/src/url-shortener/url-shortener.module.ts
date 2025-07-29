import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { Url } from '../entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService],
  exports: [UrlShortenerService],
})
export class UrlShortenerModule {}
