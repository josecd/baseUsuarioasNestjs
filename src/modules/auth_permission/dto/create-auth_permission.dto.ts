import { ContentType } from "src/modules/content_type/entities/content_type.entity";

export class CreateAuthPermissionDto {
    name: string;
    codename: string;
    content:ContentType
}
