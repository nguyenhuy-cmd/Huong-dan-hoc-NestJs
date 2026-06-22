import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostService {
  constructor(
    // Tiêm UsersService để sử dụng
    private readonly usersService: UsersService
  ) {}

  // async và await dùng để xử lý bất đồng bộ là có thể trực tiếp tiêm 1 đối tượng cấu hình 
  //vào cài đặt cơ sở dữ liệu của bạn 
  async create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll(userId: number, limit: number, page: number) {
    const user = await this.usersService.findOne(userId);
    return [
      {
        user: user,
        title: 'Post 1',
        content: 'Content 1',
      },
      {
        user: user,
        title: 'Post 2',
        content: 'Content 2',
      },
      {
        user: user,
        title: 'Post 3',
        content: 'Content 3',
      }
    ]
  }

  async findOne(id: number) {
    return ''
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
