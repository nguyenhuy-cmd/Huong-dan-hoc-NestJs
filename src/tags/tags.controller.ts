import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

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
}
