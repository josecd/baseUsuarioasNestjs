import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { AuthGroupService } from "./auth_group.service";
import { CreateAuthGroupDto } from "./dto/create-auth_group.dto";
import { UpdateAuthGroupDto } from "./dto/update-auth_group.dto";

@Controller("roles")
export class AuthGroupController {
  constructor(private readonly authGroupService: AuthGroupService) {}

  @Get("list")
  findAll() {
    return this.authGroupService.getAllRoles();
  }

  @Post("create")
  create(@Body() createContentTypeDto: CreateAuthGroupDto) {
    return this.authGroupService.create(createContentTypeDto);
  }
}
