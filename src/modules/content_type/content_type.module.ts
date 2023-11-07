import { Module } from "@nestjs/common";
import { ContentTypeService } from "./content_type.service";
import { ContentTypeController } from "./content_type.controller";
import { ContentType } from "./entities/content_type.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ContentType])],
  controllers: [ContentTypeController],
  providers: [ContentTypeService],
  exports: [ContentTypeService]
})
export class ContentTypeModule {}
