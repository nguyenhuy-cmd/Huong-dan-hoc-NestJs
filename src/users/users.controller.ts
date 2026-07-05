import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { patchUserDto } from './dto/patch-user.dto';
import { getUsersParamsDto } from './dto/get-users-param.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto} from './dto/create-many-user.dto';

@Controller('users')
@ApiTags('users') // Thêm thẻ của API cho toàn bộ controller
export class UsersController {
  // Chúng ta đang tiêm dịch vụ UsersService vào controller
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Thêm user',// Tóm tắt mô tả cho API
    description: 'Thêm user',// Mô tả đầy đủ cho API
  })
  @ApiResponse({
    status: 201,// Mã trạng thái HTTP
    description: 'Thêm user thành công',// Mô tả cho phản hồi của API
  })
  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
    
  ) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Thêm nhiều user',// Tóm tắt mô tả cho API
    description: 'Thêm nhiều user',// Mô tả đầy đủ cho API
  })
  @ApiResponse({
    status: 201,// Mã trạng thái HTTP
    description: 'Thêm nhiều user thành công',// Mô tả cho phản hồi của API
  })
  @Post('create-many')
  createManyUser(
    @Body() createManyUsersDto: CreateManyUsersDto,
    
  ) {
    return this.usersService.createMany(createManyUsersDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả users',// Tóm tắt mô tả cho API
    description: 'Lấy danh sách tất cả users',// Mô tả đầy đủ cho API
  })// Dùng để mô tả cho API
  @ApiResponse({
    status: 200,// Mã trạng thái HTTP
    description: 'Lấy danh sách tất cả users',// Mô tả cho phản hồi của API
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

  @ApiOperation({
    summary: 'Lấy thông tin chi tiết của một user',// Tóm tắt mô tả cho API
    description: 'Lấy thông tin chi tiết của một user',// Mô tả đầy đủ cho API
  })
  @ApiResponse({
    status: 200,// Mã trạng thái HTTP
    description: 'Lấy thông tin chi tiết của một user thành công',// Mô tả cho phản hồi của API
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Cập nhật thông tin chi tiết của một user',// Tóm tắt mô tả cho API
    description: 'Cập nhật thông tin chi tiết của một user',// Mô tả đầy đủ cho API
  })
  @ApiResponse({
    status: 200,// Mã trạng thái HTTP
    description: 'Cập nhật thông tin chi tiết của một user thành công',// Mô tả cho phản hồi của API
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() patchUserDto: patchUserDto) {
    return this.usersService.update(+id, patchUserDto);
  }

  @ApiOperation({
    summary: 'Xóa một user',// Tóm tắt mô tả cho API
    description: 'Xóa một user',// Mô tả đầy đủ cho API
  })
  @ApiResponse({
    status: 200,// Mã trạng thái HTTP
    description: 'Xóa một user thành công',// Mô tả cho phản hồi của API
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
