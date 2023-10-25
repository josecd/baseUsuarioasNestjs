import { AuthGroup } from 'src/modules/auth_group/entities/auth_group.entity';
import { ContentType } from 'src/modules/content_type/entities/content_type.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'auth_permission' })
export class AuthPermission {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column()
  name: string;
  @Column()
  codename: string;
  @ManyToMany(() => User, (user: User) => user.permissions)
  public user: User[];
  @ManyToOne(() => ContentType, (cont) => cont.permissions)
  content: ContentType;
  @ManyToMany(() => AuthGroup, (auth: AuthGroup) => auth.autpermission)
  @JoinTable()
  public autgroup: AuthGroup[];
}
