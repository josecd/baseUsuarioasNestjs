import { Module } from '@nestjs/common';
import { ContentTypeService } from './content_type.service';
import { ContentTypeController } from './content_type.controller';

@Module({
  controllers: [ContentTypeController],
  providers: [ContentTypeService],
})
export class ContentTypeModule {}
