import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';// Service chính xử lý xác thực
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';// UsersService để lấy thông tin user
import { SignInDto } from './dto/signin.dto';// DTO đăng nhập (email + password)

@Controller('auth')// Route: /auth
export class AuthController {
  constructor(
    // Tiêm AuthService để xử lý logic xác thực
    private readonly authService: AuthService,

    // Tiêm UsersService để sử dụng (lấy thông tin user...)
    private readonly usersService: UsersService
  ) {}

  // POST /auth/signIn - Đăng nhập
  @Post('signIn')
  @HttpCode(HttpStatus.OK)// Trả về 200 thay vì 201 mặc định
  async signIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto);// UserService → SignInProvider xử lý
  }
}
