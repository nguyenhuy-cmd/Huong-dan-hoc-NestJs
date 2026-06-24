import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from './entities/meta-options.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from './dto/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
    constructor(
        // Tiêm repository vào constructor để sử dụng
        @InjectRepository(MetaOption)
        private readonly metaOptionRepository: Repository<MetaOption>,
    ){}

    async create(createPostMetaOptionDto: CreatePostMetaOptionsDto) {
        const metaOption = this.metaOptionRepository.create(createPostMetaOptionDto);
        return await this.metaOptionRepository.save(metaOption);
    }
}
