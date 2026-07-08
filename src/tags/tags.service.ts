import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { In, Repository } from "typeorm";
import { CreateTagsDto } from "./dto/create-tags.dto";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) 
    private readonly tagRepository: Repository<Tag>,// Tiêm Tag repository để thao tác với database
  ){}

  // Tạo mới một tag
  async create(createTagDto: CreateTagsDto){
    const existingTag = await this.tagRepository.findOne({ where: { slug: createTagDto.slug } });// Kiểm tra slug đã tồn tại chưa
    if (existingTag) {
      throw new BadRequestException('Tag đã tồn tại');// Trùng slug → báo lỗi
    }
    const newTag = this.tagRepository.create(createTagDto);// Tạo entity Tag từ DTO
    return await this.tagRepository.save(newTag);// Lưu vào database
  }

  // Tìm nhiều tag theo id (dùng cho PostService khi gắn tag vào post)
  async findManyTags(tags: number[]){
    const existing = await this.tagRepository.find({ where: { id: In(tags) } });// In = lấy tất cả tag có id trong mảng
    if (!existing || existing.length === 0) {
      throw new NotFoundException("Không tìm thấy tag");
    } 
    return existing;
  }

  // Xóa cứng (hard delete) - xóa vĩnh viễn khỏi database
  async delete(id: number){
    const tags = await this.tagRepository.findOneBy({id})
    if(!tags){
      throw new NotFoundException("Không tìm thấy tag");
    }
    const result = await this.tagRepository.delete(id);// Xóa vĩnh viễn
    return {message: "Xóa tag thành công", delete: result, id}
  }

  // Xóa mềm (soft delete) - chỉ đánh dấu deletedAt, không xóa thật
  async softDelete(id: number){
    const tags = await this.tagRepository.findOneBy({id})
    if(!tags){
      throw new NotFoundException("Không tìm thấy tag");
    }
    const result = await this.tagRepository.softDelete(id);// Đánh dấu deletedAt
    return {message: "Xóa mềm tag thành công", delete: result, id}
  }

  // Khôi phục tag đã bị xóa mềm (bỏ deletedAt)
  async recover(id: number){
    const tags = await this.tagRepository.findOneBy({id})
    if(!tags){
      throw new NotFoundException("Không tìm thấy tag");
    }
    const result = await this.tagRepository.restore(id);// Khôi phục (xóa deletedAt)
    return {message: "Khôi phục tag thành công", recover: result, id}
  }
}
