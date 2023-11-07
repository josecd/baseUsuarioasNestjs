import { Injectable } from '@nestjs/common';
import { CreateAuthPermissionDto } from './dto/create-auth_permission.dto';
import { UpdateAuthPermissionDto } from './dto/update-auth_permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPermission } from './entities/auth_permission.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class AuthPermissionService {
  constructor(
    @InjectRepository(AuthPermission)
    private permissionRepositorio: Repository<AuthPermission>
  ) { }

  async create(createAuthPermissionDto: CreateAuthPermissionDto) {
    try {
      const newContent = await this.permissionRepositorio.create(
        createAuthPermissionDto
      );
      await this.permissionRepositorio.save(newContent);
      return newContent;
    } catch (err) {
      console.log(err);
      throw ErrorManager.createSignatureError(`No se pudo agregar`);
    }
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
