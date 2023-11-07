import { Injectable } from "@nestjs/common";
import { CreateContentTypeDto } from "./dto/create-content_type.dto";
import { UpdateContentTypeDto } from "./dto/update-content_type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentType } from "./entities/content_type.entity";
import { Repository } from "typeorm";
import { ErrorManager } from "src/utils/error.manager";

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectRepository(ContentType)
    private contentTypeRepositorio: Repository<ContentType>
  ) {}

  async create(createContentTypeDto: CreateContentTypeDto) {
    try {
      const newContent = await this.contentTypeRepositorio.create(
        createContentTypeDto
      );
      const dabe = await this.contentTypeRepositorio.save(newContent);
      return newContent;
    } catch (err) {
      console.log(err);
      throw ErrorManager.createSignatureError(`No se pudo agregar`);
    }
  }

  findAll() {
    return `This action returns all contentType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentType`;
  }

  update(id: number, updateContentTypeDto: UpdateContentTypeDto) {
    return `This action updates a #${id} contentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentType`;
  }
}
