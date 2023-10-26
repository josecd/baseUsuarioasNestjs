import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ModulesService } from '../modules/modules.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepositorio: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserDetail(id: number) {
    const userFound = await this.userRepositorio.findOne({
      where: {
        id: id,
      },
      relations: [
        'permissions',
        'permissions.content.module',
        'company',
        'autgroup',
      ],
    });

    //--------------Bloque para extraer los modulos
    const uniqueModules = new Set();
    const dataModules = {};
    const permision: any = [];

    // Iteramos a través de los permisos y agregamos los módulos al conjunto
    userFound.permissions.forEach((permission) => {
      if (!(permission.content.id in dataModules)) {
        dataModules[permission.content.id] = [];
      }
      const modules = permission.content.module;
      modules.forEach((module) => {
        uniqueModules.add(JSON.stringify(module));
      });
      permision.push(permission.codename);
      dataModules[permission.content.id].push(permission.codename);
    });
    // Para obtener los módulos únicos como un array nuevamente
    const uniqueModulesArray = Array.from(uniqueModules).map((strModule: any) =>
      JSON.parse(strModule),
    );
    userFound['modules'] = uniqueModulesArray;

    if (!userFound) {
      return new HttpException('Usuario no ecnontrados', HttpStatus.NOT_FOUND);
    } else {
      const dataF = {
        id: userFound.id,
        email: userFound.email,
        name: userFound.name,
        roles: userFound.autgroup,
        modules: uniqueModulesArray,
        permissions: permision,
        companies: userFound.company,
        url: userFound.autgroup[0].url,
      };
      return dataF;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
