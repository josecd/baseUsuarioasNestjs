import { AuthPermission } from 'src/modules/auth_permission/entities/auth_permission.entity';
import { Module } from 'src/modules/modules/entities/module.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'content_type' })
export class ContentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  app_label: string;
  @Column()
  model: string;
  @OneToMany(() => AuthPermission, (permission) => permission.content)
  permissions: AuthPermission[];
  @OneToMany(() => Module, (mod) => mod.content)
  module: Module[];
}
