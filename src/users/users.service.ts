import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getUsersParamsDto } from './dto/get-users-param.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor() {}
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(getUserParamsDto: getUsersParamsDto, limit: number, page: number) {
    return [
      {
        firsName:'Huy',
        email: 'huy@gmail.com'
      },
      {
        firsName:'Nhi',
        email: 'nhi@gmail.com'
      }
    ];
  }

  async findByEmail(email: string) {
    return {
      id: 1,
      firsName: 'Nhi',
      email: 'nhi@gmail.com',
      password: 'password123' 
    };
  }

  async findOne(id: number) {
    return [
      {
        id: 1,
        firsName:'Nhi',
        email: 'nhi@gmail.com'
      }
    ];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
