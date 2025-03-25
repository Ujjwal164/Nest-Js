import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from './enums/postType.enum';
import { StatusEnum } from './enums/status.enum';
import { MetaOption } from 'src/meta-option/metaOption.entity';
import { User } from 'src/user/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  title: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: PostType,
    default: PostType.POSTS,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: StatusEnum,
    default: StatusEnum.DRAFT,
  })
  status: StatusEnum;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  publishedOn: string;

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true, // by using cacade we dont need to declare the child entity seprately now afetr using cacade we dont need to firstv declare metaoption now we directly use post entitya nd save that
    eager: true,
  }) // here we added metaoption because thsi relatiosnhip is bidirectional so we ahve to define to whch thsi relationship is mapping
  metaOptions?: MetaOption;

  @ManyToMany(() => Tag, (tag) => tag.post, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  }) // in many to many when we create unidirectional relationship we dont need to do cascade true it automatically cascade the relationship
  @JoinTable({
    name: 'post_tag',
  })
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.post, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
