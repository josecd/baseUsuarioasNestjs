import { Module } from '@nestjs/common';
import { AuthPermissionService } from './auth_permission.service';
import { AuthPermissionController } from './auth_permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPermission } from './entities/auth_permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthPermission])],
  controllers: [AuthPermissionController],
  providers: [AuthPermissionService],
  exports: [AuthPermissionService]
})
export class AuthPermissionModule {}
