import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/entities/meta-options.entity';
import { Repository } from 'typeorm';

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
  ) { }

  // async và await dùng để xử lý bất đồng bộ là có thể trực tiếp tiêm 1 đối tượng cấu hình 
  //vào cài đặt cơ sở dữ liệu của bạn 
  async create(createPostDto: CreatePostDto) {

    // create() tạo ra đối tượng Post từ dto
    const post = this.postRepository.create(createPostDto); // tạo ra đối tượng Post từ dto

    // save() lưu post xuống database
    return await this.postRepository.save(post); // lưu post xuống database
  }

  async findAll(userId: number) {
    const user = await this.usersService.findOne(userId);

    const post = await this.postRepository.find({
      relations: { // để thêm các cột liên quan trong database vào khi query
        metaOptions: true // Thêm cột metaOptions vào khi query
      }
    })

    return post;
  }

  async findOne(id: number) {
    return ''
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
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
}
