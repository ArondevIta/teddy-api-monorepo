import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RefreshToken } from './refresh-token.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
