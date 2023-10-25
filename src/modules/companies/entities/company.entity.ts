import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column()
  name: string;
  @Column()
  domain: string;
  @Column()
  logo: string;
  @Column()
  css: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ default: '1' })
  is_active: string;
  @Column()
  theme: string;
  @Column()
  url_dashboard: string;
  @ManyToMany(() => User, (user: User) => user.company)
  public user: User[];
}
