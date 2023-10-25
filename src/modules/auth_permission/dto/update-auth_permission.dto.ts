import { PartialType } from '@nestjs/swagger';
import { CreateAuthPermissionDto } from './create-auth_permission.dto';

export class UpdateAuthPermissionDto extends PartialType(CreateAuthPermissionDto) {}
