import { AuthPermission } from 'src/modules/auth_permission/entities/auth_permission.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'auth_group' })
export class AuthGroup {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column()
  name: string;
  @Column()
  url: string;
  @ManyToMany(() => User, (user: User) => user.autgroup)
  public user: User[];
  @ManyToMany(() => AuthPermission, (auth: AuthPermission) => auth.autgroup)
  public autpermission: AuthPermission[];
}
