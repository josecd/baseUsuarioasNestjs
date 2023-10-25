import { PartialType } from '@nestjs/swagger';
import { CreateContentTypeDto } from './create-content_type.dto';

export class UpdateContentTypeDto extends PartialType(CreateContentTypeDto) {}
