import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { patchUserDto } from './dto/patch-user.dto';
import { getUsersParamsDto } from './dto/get-users-param.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users') // Thêm thẻ của API cho toàn bộ controller
export class UsersController {
  // Chúng ta đang tiêm dịch vụ UsersService vào controller
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
    
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })// Dùng để mô tả cho API
  @ApiResponse({
    status: 200,
    description: 'Get all users',
  })// Dùng để mô tả cho phản hồi của API
  @ApiQuery({
    name: 'limit', // Tên của tham số 
    description: 'Số lượng user trả về', // Mô tả của tham số
    required: false, // Tham số có bắt buộc hay không
    type: Number, // Kiểu dữ liệu của tham số
    example: 10, // Ví dụ về giá trị của tham số
    default: 10 // Giá trị mặc định của tham số
  }) // dùng để mô tả cho tham số query 
  @ApiQuery({
    name: 'page', // Tên của tham số 
    description: 'Số trang', // Mô tả của tham số
    required: false, // Tham số có bắt buộc hay không
    type: Number, // Kiểu dữ liệu của tham số
    example: 1, // Ví dụ về giá trị của tham số
    default: 1 // Giá trị mặc định của tham số
  })
  async findAll(
    @Param() getUserParamsDto: getUsersParamsDto,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(10)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
  ) {
    return this.usersService.findAll(getUserParamsDto, limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() patchUserDto: patchUserDto) {
    return this.usersService.update(+id, patchUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
