import { Injectable } from '@nestjs/common';
import { MetaOption } from './metaOption.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetaOptionsDto } from './dto/create-metaOptions.dto';

@Injectable()
export class MetaOptionService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly MetaOptionRepository: Repository<MetaOption>,
  ) {}

  postMetaOption(req: CreateMetaOptionsDto) {
    const metaOption = this.MetaOptionRepository.create(req);
    return this.MetaOptionRepository.save(metaOption);
  }

  async deleteMeta(id: number) {
    await this.MetaOptionRepository.delete(id);
    return 'deleted succefully';
  }
}
