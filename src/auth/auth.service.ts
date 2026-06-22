import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // Tiêm UsersService để sử dụng
    private readonly usersService: UsersService
  ) {}


  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return 'User not found';
    }
    if (user.password !== password) {
      return 'Invalid password';
    }
    return 'Login success';
  }
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
