import { Exclude } from "class-transformer";
import { AuthGroup } from "src/modules/auth_group/entities/auth_group.entity";
import { AuthPermission } from "src/modules/auth_permission/entities/auth_permission.entity";
import { Company } from "src/modules/companies/entities/company.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  @Exclude()
  password: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  last_login: string;
  @Column({ default: "0" })
  is_superuser: number;
  @Column({ default: "0" })
  is_staff: number;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @ManyToMany(
    () => AuthPermission,
    (permission: AuthPermission) => permission.user
  )
  @JoinTable()
  public permissions: AuthPermission[];

  @ManyToMany(() => AuthGroup, (autgroup: AuthGroup) => autgroup.user)
  @JoinTable()
  public autgroup: AuthGroup[];

  @ManyToMany(() => Company, (com: Company) => com.user)
  @JoinTable()
  public company: Company[];
  // @OneToMany(() => AuthPermission, (permission) => permission.user)
  // permissions: AuthPermission[];
}
