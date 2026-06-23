import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getUsersParamsDto } from './dto/get-users-param.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    // Tiêm userRepository vao service 
    @InjectRepository(User)// tiêm user vào Repository
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({where:{email: createUserDto.email}});
    if(user){
      throw new BadRequestException('Email đã tồn tại');
    }
    const newUser = this.userRepository.create(createUserDto);// tạo 1 đối tượng User mới từ CreateUserDto
    return this.userRepository.save(newUser);// Lưu vào database
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
