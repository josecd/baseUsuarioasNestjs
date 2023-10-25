import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthGroupService } from './auth_group.service';
import { CreateAuthGroupDto } from './dto/create-auth_group.dto';
import { UpdateAuthGroupDto } from './dto/update-auth_group.dto';

@Controller('auth-group')
export class AuthGroupController {
  constructor(private readonly authGroupService: AuthGroupService) {}

  @Post()
  create(@Body() createAuthGroupDto: CreateAuthGroupDto) {
    return this.authGroupService.create(createAuthGroupDto);
  }

  @Get()
  findAll() {
    return this.authGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthGroupDto: UpdateAuthGroupDto) {
    return this.authGroupService.update(+id, updateAuthGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authGroupService.remove(+id);
  }
}
