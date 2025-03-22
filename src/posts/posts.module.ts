import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-option/metaOption.entity';
import { User } from 'src/user/user.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UserModule, TypeOrmModule.forFeature([Post, MetaOption, User])],
})
export class PostsModule {}
