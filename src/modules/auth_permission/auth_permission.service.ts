import { Injectable } from '@nestjs/common';
import { CreateAuthPermissionDto } from './dto/create-auth_permission.dto';
import { UpdateAuthPermissionDto } from './dto/update-auth_permission.dto';

@Injectable()
export class AuthPermissionService {
  create(createAuthPermissionDto: CreateAuthPermissionDto) {
    return 'This action adds a new authPermission';
  }

  findAll() {
    return `This action returns all authPermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authPermission`;
  }

  update(id: number, updateAuthPermissionDto: UpdateAuthPermissionDto) {
    return `This action updates a #${id} authPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} authPermission`;
  }
}
