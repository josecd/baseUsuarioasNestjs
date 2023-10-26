import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';
@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules) private moduleRepositorio: Repository<Modules>,
  ) {}

  create(createModuleDto: CreateModuleDto) {
    return 'This action adds a new module';
  }

  async findAll() {
    const data = await this.moduleRepositorio.find();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
