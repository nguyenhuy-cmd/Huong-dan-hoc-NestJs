import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/entities/meta-options.entity';
import { Repository } from 'typeorm';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDto } from './dto/patch-post.dto';

@Injectable()
export class PostService {
  constructor(
    // Tiêm UsersService để sử dụng
    private readonly usersService: UsersService,

    // Tiêm kho lưu trữ post và metaOption
    @InjectRepository(Post)// @InjectRepository() là một decorator được sử dụng trong TypeORM để tiêm kho lưu trữ (repository) của một entity vào một service hoặc controller
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)// @InjectRepository() là một decorator được sử dụng trong TypeORM để tiêm kho lưu trữ (repository) của một entity vào một service hoặc controller
    private readonly metaOptionRepository: Repository<MetaOption>,

    // tiêm dịch vụ tagsService để sử dụng 
    private readonly tagService: TagsService,
  ) { }

  // async và await dùng để xử lý bất đồng bộ là có thể trực tiếp tiêm 1 đối tượng cấu hình 
  //vào cài đặt cơ sở dữ liệu của bạn 
  async create(createPostDto: CreatePostDto) {

    // Tìm user bằng id     
    const author = await this.usersService.findOneById(createPostDto.authId);

    // Tìm các tags(thẻ) bằng id — dùng ?? [] vì tags là optional (có thể không truyền)
    const tags = await this.tagService.findManyTags(createPostDto.tags ?? []);
    
    // Kiểm tra xem user có tồn tại không    
    if (!author) {
      throw new NotFoundException("Không tìm thấy người dùng");
    }

    // Kiểm tra xem tags có tồn tại không    
    if (!tags) {
      throw new NotFoundException("Không tìm thấy tag");
    }

    // create() tạo ra đối tượng Post từ dto
    const post = this.postRepository.create({
      ...createPostDto,// Bóc tách các thuộc tính của createPostDto
      author: author, // gán author của post là author tìm được từ id
      tags: tags // gán tags của post là tags tìm được từ id
    }); // tạo ra đối tượng Post từ dto

    // save() lưu post xuống database
    return await this.postRepository.save(post); // lưu post xuống database
  }

  async findAll(userId: number) {


    const user = await this.usersService.findOne(userId);

    const post = await this.postRepository.find({
      relations: { // để thêm các cột liên quan trong database vào khi query
        metaOptions: true, // Thêm cột metaOptions vào khi query
        author: true, // Thêm cột tác giả vào khi query
        tags: true // Thêm cột tags vào khi query
      }
    })

    return post;
  }

  
  async remove(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException("Không có bài viết tương ứng với id này")
    }
    await this.postRepository.remove(post);

    return { message: "Xóa bài viết thành công",
      delete: true,
      id
     }
     // và chúng ta cung có thể tìm bài viết bằng meta-options qua 1 phương thức query 
  }

  async update(patchPostDto: PatchPostDto, ){
    const tags = await this.tagService.findManyTags(patchPostDto.tags ?? []);
    if (!tags) {
      throw new NotFoundException("Không tìm thấy tag");
    }   

    const post = await this.postRepository.findOneBy({id: patchPostDto.id})
    if (!post) {
      throw new NotFoundException("Không tìm thấy bài viết");
    }

    post.tags = tags; // gán tags của post là tags tìm được từ id

    return await this.postRepository.save(post);
    
    
  }
}
