import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Url } from '../entities/url.entity';
import { User } from '../entities/user.entity';
import { EnvConfig } from '../config/env.config';

@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    private configService: ConfigService<EnvConfig>,
    private dataSource: DataSource
  ) {}

  async shortenUrl(
    originalUrl: string,
    user?: User
  ): Promise<{ shortUrl: string; shortCode: string; originalUrl: string }> {
    if (!this.isValidUrl(originalUrl)) {
      throw new ConflictException('Invalid URL format');
    }

    const existingUrl = await this.urlRepository.findOne({
      where: { originalUrl, userId: user?.id ?? null },
    });

    if (existingUrl) {
      return {
        shortUrl: existingUrl.shortUrl,
        shortCode: existingUrl.shortCode,
        originalUrl: existingUrl.originalUrl,
      };
    }

    const shortCode = await this.generateUniqueShortCode();
    const baseUrl = this.configService.get('BASE_URL');
    const shortUrl = `${baseUrl}/${shortCode}`;

    const urlEntity = this.urlRepository.create({
      originalUrl,
      shortCode,
      shortUrl,
      userId: user?.id ?? null,
    });

    await this.urlRepository.save(urlEntity);

    return {
      shortUrl,
      shortCode,
      originalUrl,
    };
  }

  private async generateUniqueShortCode(): Promise<string> {
    let shortCode: string;

    do {
      shortCode = this.generateShortCode();
    } while (await this.shortCodeExists(shortCode));

    return shortCode;
  }

  private generateShortCode(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  private async shortCodeExists(shortCode: string): Promise<boolean> {
    const existing = await this.urlRepository.findOne({
      where: { shortCode },
    });
    return !!existing;
  }

  async getOriginalUrlAndTrackClick(shortCode: string): Promise<string> {
    const urlEntity = await this.urlRepository.findOne({
      where: { shortCode },
    });

    if (!urlEntity) {
      throw new NotFoundException('Short URL not found');
    }

    await urlEntity.incrementClick(this.dataSource);

    return urlEntity.originalUrl;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
