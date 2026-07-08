import { SignInProvider } from './providers/sign-in.provider';// Provider xử lý logic đăng nhập
import { SignInDto } from './dto/signin.dto';// DTO chứa email + password
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

// AuthService = service chính xử lý xác thực (đăng nhập, đăng ký...)
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,// Dùng để tìm user trong database

    private readonly signInProvider: SignInProvider// Delegate logic đăng nhập cho SignInProvider
  ) {}

  // Đăng nhập: gọi SignInProvider để xử lý (tìm user + so sánh password)
  async signIn(signInDto: SignInDto) {
     return await this.signInProvider.signIn(signInDto)
  }

  // Các CRUD mặc định (chưa triển khai)
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  findAll() {
    return `This action returns all auth`;
  }
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
