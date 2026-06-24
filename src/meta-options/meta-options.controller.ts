import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreatePostMetaOptionsDto } from './dto/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
    // Tiêm metaOptionsService vào controller
    constructor(private readonly metaOptionsService: MetaOptionsService) { }
    
    @Post()
    async createMetaOptions(@Body() createMetaOptionsDto: CreatePostMetaOptionsDto) {
        return this.metaOptionsService.create(createMetaOptionsDto);
    }

}
