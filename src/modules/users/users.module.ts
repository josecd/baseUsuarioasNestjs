import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ModulesService } from '../modules/modules.service';
import { Modules } from '../modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Modules])],
  controllers: [UsersController],
  providers: [UsersService, ModulesService],
})
export class UsersModule {}
