import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('create-tag')
  createTag(@Body() body: TagDto) {
    return this.tagsService.createTags(body);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.tagsService.softDelete(+id);
  }
}
