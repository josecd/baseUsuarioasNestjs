import { ModulesService } from "./modules.service";
import { ModulesController } from "./modules.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Modules } from "./entities/module.entity";
import { Module } from "@nestjs/common";
import { ContentTypeService } from "../content_type/content_type.service";
import { ContentType } from "../content_type/entities/content_type.entity";
import { AuthPermissionService } from "../auth_permission/auth_permission.service";
import { AuthPermission } from "../auth_permission/entities/auth_permission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Modules, ContentType, AuthPermission])],
  controllers: [ModulesController],
  providers: [ModulesService, ContentTypeService, AuthPermissionService],
  exports: [ModulesService]
})
export class ModulesModule {}
