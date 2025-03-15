import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostType } from './enums/postType.enum';
import { StatusEnum } from './enums/status.enum';
import { CreateMetaOptionsDto } from './dto/create-metaOptions.dto';

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
  })
  status: StatusEnum;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  featuredImageUrl: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  publishedOn: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  tags: string[];

  @Column({
    type: 'varchar',
    nullable: false,
  })
  metaOptions?: CreateMetaOptionsDto[];
}
