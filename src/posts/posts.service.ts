import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/createPostDto';
import { PatchPostDto } from './dto/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UserService) {}

  getAll(param) {
    const user = this.userService.getAll(param);
    return user;
  }

  createPost(body: CreatePostDto) {
    return body;
  }

  updatePost(patchPostDto: PatchPostDto) {
    return patchPostDto;
  }
}
