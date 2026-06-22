import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/patch-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags('post') // Thêm thẻ của API cho toàn bộ controller
export class PostController {
  constructor(
    // Tiêm dịch vụ PostService vào controller để sử dụng 
    private readonly postService: PostService) {}

   
    
    @ApiOperation({
      summary: 'Thêm bài viết mới',
    })// Dùng để mô tả cho API 
    @ApiResponse({
      status: 201,
      description: 'Thêm bài viết mới thành công',
    })// Dùng để mô tả cho phản hồi của API cho cả thực hiện đúng và sai 
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);

  }

  @Get()
  findAll(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(10)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
  ) {
    return this.postService.findAll(userId, limit, page);
  }

  @ApiOperation({
    summary: 'Cập nhật bài viết',
    description: 'Cập nhật bài viết',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bài viết thành công',
  })
  @Patch()
  async updatePost(@Body() updatePostDto: UpdatePostDto){
    console.log(updatePostDto);
    
  }
}
