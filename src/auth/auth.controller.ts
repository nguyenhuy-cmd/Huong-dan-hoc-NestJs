import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    // Tiêm dịch vụ AuthService vào controller để sử dụng
    private readonly authService: AuthService,

    // Tiêm UsersService để sử dụng
    private readonly usersService: UsersService
  ) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto);
  }
}
