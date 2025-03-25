import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { In, Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  createTags(body: TagDto) {
    const createTag = this.tagRepository.create(body);
    return this.tagRepository.save(createTag);
  }

  async findTags(tag: number[]) {
    const findTag = await this.tagRepository.findBy({
      id: In(tag),
    });
    return findTag;
  }

  async softDelete(id: number) {
    await this.tagRepository.softDelete(id);
    return 'deleted successfully';
  }
}
