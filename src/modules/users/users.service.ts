import { ErrorManager } from "./../../utils/error.manager";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/user-create.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { returnId } from "src/utils/returns-id";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepositorio: Repository<User>
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  async findUserDetail(id: number) {
    const userFound = await this.userRepositorio.findOne({
      where: {
        id: id
      },
      relations: [
        "permissions",
        "permissions.content.module",
        "company",
        "autgroup",
        "autgroup.autpermission.content.module"
      ]
    });

    const permissionsAll: any = userFound.autgroup;
    const combinedAuthGroup = permissionsAll.reduce(
      (accumulator: any, currentGroup: any) => {
        // Crear un conjunto de IDs para evitar duplicados
        const idSet = new Set(
          accumulator.autpermission.map((permission: any) => permission.id)
        );

        // Filtrar los permisos del grupo actual para evitar duplicados
        const uniquePermissions = currentGroup.autpermission.filter(
          (permission: any) => !idSet.has(permission.id)
        );
        // Combinar los elementos del arreglo autpermission de cada objeto
        const autpermission = [
          ...accumulator.autpermission,
          ...uniquePermissions
        ];
        // Retornar un nuevo objeto con los valores combinados
        return uniquePermissions;
      }
    );

    ///Traer los permisos y asignarlos para que puedan hacer la funcion de userFound.permissions

    //--------------Bloque para extraer los modulos
    const uniqueModules = new Set();
    const dataModules = {};
    const permision: any = [];

    // Iteramos a través de los permisos y agregamos los módulos al conjunto
    combinedAuthGroup["autpermission"].forEach((permission) => {
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
      JSON.parse(strModule)
    );
    userFound["modules"] = uniqueModulesArray;

    if (!userFound) {
      return new HttpException("Usuario no ecnontrados", HttpStatus.NOT_FOUND);
    } else {
      const dataF = {
        id: userFound.id,
        email: userFound.email,
        name: userFound.name,
        roles: userFound.autgroup,
        modules: uniqueModulesArray,
        permissions: permision,
        companies: userFound.company,
        url: userFound.autgroup[0].url
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

  async create(userData: RegisterUserDto) {
    try {
      const newUser = await this.userRepositorio.create(userData);
      await this.userRepositorio.save(newUser);
      return newUser;
    } catch (err) {
      throw ErrorManager.createSignatureError("No se pudo agregar");
    }
  }

  async userCreate(userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    try {
      const newUser = await this.userRepositorio.create({
        ...userData,
        password: hashedPassword
      });
      newUser.autgroup = userData.roles_id;
      newUser.company = userData.companies_id;
      const save = await this.userRepositorio.save({
        ...newUser,
        autgroup: returnId(userData.roles_id),
        company: returnId(userData.companies_id)
      });
      return save;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        "Algo salió mal",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
