import { Injectable } from "@nestjs/common";
import { CreateAuthGroupDto } from "./dto/create-auth_group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { AuthGroup } from "./entities/auth_group.entity";
import { ErrorManager } from "src/utils/error.manager";
import { returnId } from "src/utils/returns-id";
@Injectable()
export class AuthGroupService {
  constructor(
    @InjectRepository(AuthGroup)
    private rolRepositorio: Repository<AuthGroup>
  ) {}

  async getAllRoles() {
    try {
      const companyFound = await this.rolRepositorio.find();
      return companyFound;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(`No se pudo hacer la busqueda`);
    }
  }

  async create(createContentTypeDto: CreateAuthGroupDto) {
    try {
      const newContent = await this.rolRepositorio.create(createContentTypeDto);
      const save = await this.rolRepositorio.save({
        ...newContent,
        autpermission: returnId(createContentTypeDto.permissions_id)
      });
      return save;
    } catch (err) {
      console.log(err);
      throw ErrorManager.createSignatureError(`No se pudo agregar`);
    }
  }

  async getRolIds(ids) {
    try {
      const companyFound = await this.rolRepositorio.findBy({
        id: In([1, 2, 3])
      });
      return companyFound;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(`No se pudo hacer la busqueda`);
    }
  }
}
