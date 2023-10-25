import { PartialType } from '@nestjs/swagger';
import { CreateAuthGroupDto } from './create-auth_group.dto';

export class UpdateAuthGroupDto extends PartialType(CreateAuthGroupDto) {}
