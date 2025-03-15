import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPostDto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/:userId')
  get(@Param('userId') param: string) {
    return this.postService.getAll(param);
  }

  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created',
  })
  @Post('createPost/:userId')
  createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }

  @Patch('updatePost/:postId')
  updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.updatePost(patchPostDto);
  }
}
