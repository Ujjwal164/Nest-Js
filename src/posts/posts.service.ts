import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/createPostDto';
import { PatchPostDto } from './dto/patch-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-option/metaOption.entity';
import { User } from 'src/user/user.entity';

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
  ) {}

  async createPost(req: CreatePostDto, id: number) {
    const findUser = await this.userRepository.findOneBy({ id });

    if (findUser) {
      const createPost = this.postRepository.create({ ...req, user: findUser });
      return this.postRepository.save(createPost);
    } else {
      return 'user not exists';
    }
  }

  getAll(id: number) {
    const user = this.postRepository.find({
      where: { user: { id } },
      relations: { user: true },
    });
    return user;
  }

  async delete(id: number) {
    // Find the post from the database
    await this.postRepository.delete(id);
  }

  updatePost(patchPostDto: PatchPostDto) {
    return patchPostDto;
  }
}
