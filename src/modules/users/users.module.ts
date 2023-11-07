import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { AuthGroup } from "../auth_group/entities/auth_group.entity";
import { AuthGroupService } from "../auth_group/auth_group.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthGroup])],
  controllers: [UsersController],
  providers: [UsersService, AuthGroupService],
  exports: [UsersService]
})
export class UsersModule {}
