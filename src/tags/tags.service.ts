import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { In, Repository } from "typeorm";
import { CreateTagsDto } from "./dto/create-tags.dto";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) 
    // Tiêm Tag repository vào service
    private readonly tagRepository: Repository<Tag>,
  ){}
  async create(createTagDto: CreateTagsDto){
    const existingTag = await this.tagRepository.findOne({ where: { slug: createTagDto.slug } });
    if (existingTag) {
      throw new BadRequestException('Tag đã tồn tại');
    }
    const newTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(newTag);
  }

  async findManyTags(tags: number[]){// Lấy danh sách các tags từ id
    const existing = await this.tagRepository.find({ where: { id: In(tags) } });// In là hàm của typeorm dùng để lấy danh sách các return existing;
    return existing;
  }
}
