import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';

import { CreateTagsDto } from './dto/create-tags.dto';
import { TagsService } from './tags.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('tags')
export class TagsController {
    constructor(
        // Tiêm TagsService vào controller
        private readonly tagsService: TagsService
    ) {}

    @ApiOperation({
        summary: 'Thêm tag',// Tóm tắt mô tả cho API
        description: 'Thêm tag mới',// Mô tả đầy đủ cho API
      })// Dùng để mô tả cho API
      @ApiResponse({
        status: 201,// Mã trạng thái HTTP
        description: 'Thêm tag thành công',// Mô tả cho phản hồi của API
      })// Dùng để mô tả cho phản hồi của API
    @Post()
    async createTag(@Body() createTagDto: CreateTagsDto) {
        return this.tagsService.create(createTagDto);
    }

    @ApiOperation({
      summary: 'Xóa tag',// Tóm tắt mô tả cho API
      description: 'Xóa tag',// Mô tả đầy đủ cho API
    })// Dùng để mô tả cho API
    @ApiResponse({
      status: 200,// Mã trạng thái HTTP
      description: 'Xóa tag thành công',// Mô tả cho phản hồi của API
    })// Dùng để mô tả cho phản hồi của API
    @Delete(':id')
    async deleteTag(@Query('id',ParseIntPipe) id: number) {
      return this.tagsService.delete(id);
    }
    @ApiOperation({
      summary: 'Xóa mềm tag',// Tóm tắt mô tả cho API
      description: 'Xóa mềm tag',// Mô tả đầy đủ cho API
    })// Dùng để mô tả cho API
    @ApiResponse({
      status: 200,// Mã trạng thái HTTP
      description: 'Xóa mềm tag thành công',// Mô tả cho phản hồi của API
    })// Dùng để mô tả cho phản hồi của API
    @Patch('soft-delete')
    async softDeleteTag(@Query('id',ParseIntPipe) id: number) {
      return this.tagsService.softDelete(id);
    }

    @ApiOperation({
      summary: 'Khôi phục tag',// Tóm tắt mô tả cho API
      description: 'Khôi phục tag',// Mô tả đầy đủ cho API
    })// Dùng để mô tả cho API
    @ApiResponse({
      status: 200,// Mã trạng thái HTTP
      description: 'Khôi phục tag thành công',// Mô tả cho phản hồi của API
    })// Dùng để mô tả cho phản hồi của API
    @Patch('recover')
    async recoverTag(@Query('id',ParseIntPipe) id: number) {
      return this.tagsService.recover(id);
    }
}
