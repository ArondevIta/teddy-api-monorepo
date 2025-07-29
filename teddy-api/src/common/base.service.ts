import { NotFoundException } from '@nestjs/common';
import {
  Repository,
  FindManyOptions,
  FindOneOptions,
  DeepPartial,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const defaultOptions: FindManyOptions<T> = {
      order: { createdAt: 'DESC' } as any,
      ...options,
    };
    return await this.repository.find(defaultOptions);
  }

  async findOne(id: number, options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as any,
      ...options,
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return entity;
  }

  async findById(id: number): Promise<T | null> {
    return await this.repository.findOne({ where: { id } as any });
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);

    // Update entity
    await this.repository.update(id, updateDto as any);

    // Return updated entity
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.softDelete(id);
  }

  async restore(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as any,
      withDeleted: true,
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    if (!entity.deletedAt) {
      throw new NotFoundException('Entity is not deleted');
    }

    await this.repository.restore(id);
    return await this.findOne(id);
  }

  async findDeleted(): Promise<T[]> {
    const entities = await this.repository.find({
      where: {} as any,
      withDeleted: true,
      order: { deletedAt: 'DESC' } as any,
    });

    return entities.filter((entity) => entity.deletedAt);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(options);
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.repository.count({ where: { id } as any });
    return count > 0;
  }

  async findByIds(ids: number[]): Promise<T[]> {
    return await this.repository.findByIds(ids);
  }

  // Método para transformar entity em DTO (pode ser sobrescrito)
  protected toResponseDto(entity: T): any {
    const { deletedAt, ...response } = entity;
    return response;
  }
}
