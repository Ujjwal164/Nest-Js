import { Post } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => Post, (post) => post.metaOptions, { onDelete: 'CASCADE' }) // this is the inverse relatioship we ahve to define that thsi relationship is map to which columi  that table and     this is compulsory when we do bidirectional relatiosnhip so here the post table have metaoption to which this relationship is mapping
  @JoinColumn()
  post: Post;
}
