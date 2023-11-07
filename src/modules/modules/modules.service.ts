import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { Modules } from "./entities/module.entity";
import { ErrorManager } from "src/utils/error.manager";
import { ContentTypeService } from "../content_type/content_type.service";
import { AuthPermissionService } from "../auth_permission/auth_permission.service";
import * as fs from "fs";
@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules) private moduleRepositorio: Repository<Modules>,
    private _contentType: ContentTypeService,
    private _permission: AuthPermissionService
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    try {
      const newModule = await this.moduleRepositorio.create(createModuleDto);

      const content = await this._contentType.create({
        app_label: newModule.idStr,
        model: newModule.idStr
      });
      const sabe = await this.moduleRepositorio.save({
        ...newModule,
        content: content
      });

      const jsonData =
        '[{"name": "Puede ver", "codename": "can_view_"}, {"name": "Puede agregar", "codename": "can_add_"}, {"name": "Puede editar", "codename": "can_update_"}]';
      try {
        const data = JSON.parse(jsonData);
        if (Array.isArray(data)) {
          data.forEach(async (item) => {
            const nombreConcatenado = item.name + ` ${newModule.idStr}`;
            const codenameConcatenado = item.codename + `${newModule.idStr}`;
            const resultadoConsulta = await this._permission.create({
              name: nombreConcatenado,
              codename: codenameConcatenado,
              content: content
            });
          });
        } else {
          console.log("jsonData no es un arreglo válido.");
        }
      } catch (error) {
        console.error("Error al analizar el JSON:", error);
      }

      return sabe;
    } catch (err) {
      console.log(err);

      throw ErrorManager.createSignatureError(`No se pudo agregar `);
    }
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
