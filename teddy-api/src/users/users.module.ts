import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersAuthService } from './authenticated/users-auth.service';
import { UsersPublicService } from './public/users-public.service';
import { UsersAuthController } from './authenticated/users-auth.controller';
import { UsersPublicController } from './public/users-public.controller';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersAuthController, UsersPublicController],
  providers: [UsersAuthService, UsersPublicService],
  exports: [UsersAuthService, UsersPublicService],
})
export class UsersModule {}
