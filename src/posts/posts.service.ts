import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/createPostDto';
import { PatchPostDto } from './dto/patch-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { In, Repository } from 'typeorm';
import { MetaOption } from 'src/meta-option/metaOption.entity';
import { User } from 'src/user/user.entity';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    private readonly tagService: TagsService,
  ) {}

  async createPost(req: CreatePostDto, id: number) {
    const findUser = await this.userRepository.findOneBy({ id });
    const tags = req.tags ? await this.tagService.findTags(req.tags) : [];

    if (findUser) {
      const createPost = this.postRepository.create({
        ...req,
        user: findUser,
        tags: tags,
      });
      return this.postRepository.save(createPost);
    } else {
      return 'user not exists';
    }
  }

  getAll(id: number) {
    const user = this.postRepository.find({
      where: { user: { id } }, // means where te user id matched the guven user id fo that we use where
      relations: { user: true }, // we can also use eager but in eager we get whole data ehich we dont need so through relation we cab get the data whihc we want
    });
    return user;
  }

  async delete(id: number) {
    // Find the post from the database
    await this.postRepository.delete(id);
  }

  async updatePost(patchPostDto: PatchPostDto) {
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    if (post) {
      post.title = patchPostDto.title ?? post.title;
      post.content = patchPostDto.content ?? post.content;
      if (patchPostDto.tags) {
        // Fetch Tag entities based on IDs from patchPostDto.tags
        post.tags = await this.tagRepository.findBy({
          id: In(patchPostDto.tags), // Convert number[] to Tag[]
        });
      }
      return this.postRepository.save(post);
    }
    return null;
  }
}
