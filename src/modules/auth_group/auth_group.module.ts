import { Module } from "@nestjs/common";
import { AuthGroupService } from "./auth_group.service";
import { AuthGroupController } from "./auth_group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGroup } from "./entities/auth_group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthGroup])],
  controllers: [AuthGroupController],
  providers: [AuthGroupService],
  exports: [AuthGroupService]
})
export class AuthGroupModule {}
