import { Entity, Column, ManyToOne, JoinColumn, DataSource } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('urls')
export class Url extends BaseEntity {
  @Column({ type: 'text' })
  originalUrl: string;

  @Column({ type: 'varchar', length: 6, unique: true })
  shortCode: string;

  @Column({ type: 'text' })
  shortUrl: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ nullable: true })
  userId?: number;

  @Column({ default: 0, type: 'integer' })
  totalClicks: number;

  async incrementClick(dataSource: DataSource): Promise<void> {
    await dataSource
      .createQueryBuilder()
      .update(Url)
      .set({ totalClicks: () => 'totalClicks + 1' })
      .where('shortCode = :shortCode', { shortCode: this.shortCode })
      .execute();

    this.totalClicks += 1;
  }
}
