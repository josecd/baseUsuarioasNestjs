import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { AuthPermissionService } from "./auth_permission.service";
import { CreateAuthPermissionDto } from "./dto/create-auth_permission.dto";
import { UpdateAuthPermissionDto } from "./dto/update-auth_permission.dto";

@Controller("auth-permission")
export class AuthPermissionController {
  constructor(private readonly authPermissionService: AuthPermissionService) {}

  // @Post()F
  // create(@Body() createAuthPermissionDto: CreateAuthPermissionDto) {
  //   return this.authPermissionService.create(createAuthPermissionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authPermissionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authPermissionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthPermissionDto: UpdateAuthPermissionDto) {
  //   return this.authPermissionService.update(+id, updateAuthPermissionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authPermissionService.remove(+id);
  // }
}
