import { Module } from '@nestjs/common';
import { AuthPermissionService } from './auth_permission.service';
import { AuthPermissionController } from './auth_permission.controller';

@Module({
  controllers: [AuthPermissionController],
  providers: [AuthPermissionService],
})
export class AuthPermissionModule {}
