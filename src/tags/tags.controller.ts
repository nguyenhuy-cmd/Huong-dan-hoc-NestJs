import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CreateTagsDto } from './dto/create-tags.dto';
import { TagsService } from './tags.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService// Tiêm TagsService
    ) {}

    // POST /tags - Tạo tag mới
    @Post()
    async createTag(@Body() createTagDto: CreateTagsDto) {
        return this.tagsService.create(createTagDto);
    }

    // DELETE /tags/:id - Xóa cứng tag
    @Delete(':id')
    async deleteTag(@Param('id', ParseIntPipe) id: number) {// Dùng @Param (route param), không phải @Query
        return this.tagsService.delete(id);
    }

    // PATCH /tags/soft-delete?id= - Xóa mềm tag
    @Patch('soft-delete')
    async softDeleteTag(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.softDelete(id);
    }

    // PATCH /tags/recover?id= - Khôi phục tag
    @Patch('recover')
    async recoverTag(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.recover(id);
    }
}
