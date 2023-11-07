import { AuthPermission } from "src/modules/auth_permission/entities/auth_permission.entity";
import { Modules } from "src/modules/modules/entities/module.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "content_type" })
export class ContentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  app_label: string;
  @Column()
  model: string;
  @Column({ default: "0" })
  type_main: number;
  @OneToMany(() => AuthPermission, (permission) => permission.content)
  permissions: AuthPermission[];
  @OneToMany(() => Modules, (mod) => mod.content)
  module: Modules[];
}
