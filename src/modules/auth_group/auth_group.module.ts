import { Module } from '@nestjs/common';
import { AuthGroupService } from './auth_group.service';
import { AuthGroupController } from './auth_group.controller';

@Module({
  controllers: [AuthGroupController],
  providers: [AuthGroupService],
})
export class AuthGroupModule {}
