import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Post } from 'src/posts/post.entity';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag, Post])],
  exports: [TagsService],
})
export class TagsModule {}
