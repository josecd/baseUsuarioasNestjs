import { AuthPermission } from "src/modules/auth_permission/entities/auth_permission.entity";

export class CreateAuthGroupDto {
  name: string;
  url: string;
  permissions_id: any;
}
