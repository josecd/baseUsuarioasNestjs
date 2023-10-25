import { Injectable } from '@nestjs/common';
import { CreateAuthGroupDto } from './dto/create-auth_group.dto';
import { UpdateAuthGroupDto } from './dto/update-auth_group.dto';

@Injectable()
export class AuthGroupService {
  create(createAuthGroupDto: CreateAuthGroupDto) {
    return 'This action adds a new authGroup';
  }

  findAll() {
    return `This action returns all authGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authGroup`;
  }

  update(id: number, updateAuthGroupDto: UpdateAuthGroupDto) {
    return `This action updates a #${id} authGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} authGroup`;
  }
}
