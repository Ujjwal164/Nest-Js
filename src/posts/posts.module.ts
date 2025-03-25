import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-option/metaOption.entity';
import { User } from 'src/user/user.entity';
import { TagsModule } from 'src/tags/tags.module';
import { Tag } from 'src/tags/tag.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    UserModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption, User, Tag]),
  ],
})
export class PostsModule {}
