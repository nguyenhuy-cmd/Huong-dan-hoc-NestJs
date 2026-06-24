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
      summary: 'Thêm bài viết mới',// Tóm tắt mô tả cho API
      description: 'Thêm bài viết mới',// Mô tả đầy đủ cho API
    })// Dùng để mô tả cho API 
    @ApiResponse({
      status: 201,// Mã trạng thái HTTP
      description: 'Thêm bài viết mới thành công',// Mô tả cho phản hồi của API
    })// Dùng để mô tả cho phản hồi của API cho cả thực hiện đúng và sai 
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }


  @ApiOperation({
    summary: 'Lấy danh sách bài viết',// Tóm tắt mô tả cho API
    description: 'Lấy danh sách bài viết',// Mô tả đầy đủ cho API
  })// Dùng để mô tả cho API 
  @ApiResponse({
    status: 200,// Mã trạng thái HTTP
    description: 'Lấy danh sách bài viết thành công',// Mô tả cho phản hồi của API
  })// Dùng để mô tả cho phản hồi của API cho cả thực hiện đúng và sai 
  @Get()
  findAll(
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.postService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Cập nhật bài viết',// Tóm tắt mô tả cho API
    description: 'Cập nhật bài viết',// Mô tả đầy đủ cho API
  })// Dùng để mô tả cho API 
  @ApiResponse({
    status: 200,// Mã trạng thái HTTP
    description: 'Cập nhật bài viết thành công',// Mô tả cho phản hồi của API
  })// Dùng để mô tả cho phản hồi của API cho cả thực hiện đúng và sai 
  @Patch()
  async updatePost(@Body() updatePostDto: UpdatePostDto){
    console.log(updatePostDto);
    
  }

  @ApiOperation({
    summary: 'Xóa bài viết',// Tóm tắt mô tả cho API
    description: 'Xóa bài viết',// Mô tả đầy đủ cho API
  })// Dùng để mô tả cho API 
  @ApiResponse({
    status: 200,// Mã trạng thái HTTP
    description: 'Xóa bài viết thành công',// Mô tả cho phản hồi của API
  })// Dùng để mô tả cho phản hồi của API cho cả thực hiện đúng và sai 
  @Delete(':id')
  async removePost(@Param('id',ParseIntPipe) id: number){
    return this.postService.remove(id);
  }
}
