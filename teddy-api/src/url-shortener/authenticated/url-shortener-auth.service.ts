import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';
import { Url } from '../../entities/url.entity';

@Injectable()
export class UrlShortenerAuthService extends BaseService<Url> {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>
  ) {
    super(urlRepository);
  }

  async findByShortCode(shortCode: string): Promise<Url> {
    try {
      const urlEntity = await this.urlRepository.findOne({
        where: { shortCode },
      });

      if (!urlEntity) {
        throw new NotFoundException('Short URL not found');
      }

      return urlEntity;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, updateData: { url: string }): Promise<Url> {
    try {
      const urlEntity = await this.urlRepository.findOne({
        where: { id },
      });

      if (!urlEntity) {
        throw new NotFoundException('Short URL not found');
      }

      if (!this.isValidUrl(updateData.url)) {
        throw new ConflictException('Invalid URL format');
      }

      // Atualiza a entidade e salva (retorna a entidade atualizada)
      urlEntity.originalUrl = updateData.url;
      return await this.urlRepository.save(urlEntity);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const urlEntity = await this.urlRepository.findOne({
        where: { id },
      });

      if (!urlEntity) {
        throw new NotFoundException('Short URL not found');
      }

      await this.urlRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
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
