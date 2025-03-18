import { Body, Controller, Post } from '@nestjs/common';
import { CreateMetaOptionsDto } from './dto/create-metaOptions.dto';
import { MetaOptionService } from './meta-option.service';

@Controller('meta-option')
export class MetaOptionController {
    constructor(private readonly MetaOptionService:MetaOptionService){}

  @Post('createMetaOption')
  createMetaOption(@Body() req:CreateMetaOptionsDto){
    return this.MetaOptionService.postMetaOption(req)
  }
}
