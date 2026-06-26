import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
    const existing = await this.tagRepository.find({ where: { id: In(tags) } });// In sễ lấy tất cả tag có id trong mảng tags truyền vào
    if (!existing) {
      throw new NotFoundException("Không tìm thấy tag");
    } 
    return existing;
  }

  async delete(id: number){

    const tags = await this.tagRepository.findOneBy({id})
    if(!tags){
      throw new NotFoundException("Không tìm thấy tag");
    }

    const existing = await this.tagRepository.delete(id);
    return {message: "Xóa tag thành công",
      delete: existing,
      id
    }
  }

  async softDelete(id: number){

    const tags = await this.tagRepository.findOneBy({id})
    if(!tags){
      throw new NotFoundException("Không tìm thấy tag");
    }

    const existing = await this.tagRepository.softDelete(id);
    return {message: "Xóa mềm tag thành công",
      delete: existing,
      id
    }
  }


  // khôi phục những thứ đã bị xóa mềm 
  async recover(id: number){

    const tags = await this.tagRepository.findOneBy({id})
    if(!tags){
      throw new NotFoundException("Không tìm thấy tag");
    }

    const existing = await this.tagRepository.restore(tags);
    return {message: "Khôi phục tag thành công",
      recover: existing,
      id
    }
  }
}
