import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPostDto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.postService.getAll(+userId);
  }

  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created',
  })
  @Post(':userId')
  createPost(@Param('userId') userId: string, @Body() req: CreatePostDto) {
    return this.postService.createPost(req, +userId);
  }

  @Patch('updatePost')
  updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.updatePost(patchPostDto);
  }

  @Delete(':id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
