import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/createPostDto';
import { PatchPostDto } from './dto/patch-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-option/metaOption.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,
    
    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository:Repository<MetaOption>
   ) {}

   async createPost(req: CreatePostDto) {
      const Postcreate = this.postRepository.create(req)
      return await this.postRepository.save(Postcreate)
    }

  getAll(param:string) {
    const user =this.postRepository.find()
    return user
  }

   async delete(id: number) {
    // Find the post from the database
    let post = await this.postRepository.findOneBy({ id });

    // Delete metaOptions and the post
    await this.postRepository.delete(id);
    if (post?.metaOptions?.id !== undefined) {
      await this.metaOptionRepository.delete(post.metaOptions.id);
    }

    return { deleted: true, id: post?.id ?? null };
  }


  updatePost(patchPostDto: PatchPostDto) {
    return patchPostDto;
  }
}
