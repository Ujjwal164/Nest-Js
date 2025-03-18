import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPostDto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('{/:userId}')
  get(@Param('userId') param: string) {
    return this.postService.getAll(param);
  }

  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created',
  })
  
  @Post('createPost')
  createPost(@Body() req: CreatePostDto) {
    return this.postService.createPost(req);
  }

  @Patch('updatePost/:postId')
  updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.updatePost(patchPostDto);
  }

  @Delete(':id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
