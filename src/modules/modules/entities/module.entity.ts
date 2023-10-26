import { ContentType } from 'src/modules/content_type/entities/content_type.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'modules' })
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  idStr: string;
  @Column({ unique: true })
  title: string;
  @Column()
  subtitle: string;
  @Column()
  type: string;
  @Column()
  icon: string;
  @Column({ unique: true })
  link: string;
  @Column()
  parent: number;
  @Column()
  codename: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ default: '1' })
  is_active: string;
  @ManyToOne(() => ContentType, (cont) => cont.module)
  content: ContentType;
}
