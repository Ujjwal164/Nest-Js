import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postService:PostsService
    ){}

    @Get('/:userId')
    get(@Param('userId') param:string){
       return this.postService.getAll(param)
    }
}
