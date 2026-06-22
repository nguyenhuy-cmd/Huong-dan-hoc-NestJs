import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    // Tiêm dịch vụ AuthService vào controller để sử dụng
    private readonly authService: AuthService,

    // Tiêm UsersService để sử dụng
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  async login(email:string, password:string, id: number){
    const user = await this.usersService.findOne(+id);
    return this.authService.login(email, password);
  }
}
