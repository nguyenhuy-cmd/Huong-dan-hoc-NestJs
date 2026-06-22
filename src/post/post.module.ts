import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],// nhận service UsersService để sử dụng
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
