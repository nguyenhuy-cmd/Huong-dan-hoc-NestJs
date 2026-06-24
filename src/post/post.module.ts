import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/entities/meta-options.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [UsersModule, TagsModule, TypeOrmModule.forFeature([Post, MetaOption])],// nhận service UsersService để sử dụng
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
