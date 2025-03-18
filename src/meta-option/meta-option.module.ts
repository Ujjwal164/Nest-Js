import { Module } from '@nestjs/common';
import { MetaOptionService } from './meta-option.service';
import { MetaOptionController } from './meta-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './metaOption.entity';

@Module({
  providers: [MetaOptionService],
  controllers: [MetaOptionController],
  imports:[TypeOrmModule.forFeature([MetaOption])]
})
export class MetaOptionModule {}
