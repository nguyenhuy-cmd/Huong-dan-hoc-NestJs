import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptProvider } from 'src/auth/providers/bcrypt.provider';

@Injectable()
export class CreateUserService {
    constructor(
    @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly hashingProvider: BcryptProvider,// Inject trực tiếp BcryptProvider (đã export từ AuthModule)
    ){}
    async create(createUserDto: CreateUserDto) {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await this.userRepository.findOne({where:{email: createUserDto.email}});
        if(existingUser){
          throw new BadRequestException('Email đã tồn tại');// Trùng email → báo lỗi
        }

        // Hash password trước khi lưu vào database
        const newUser = this.userRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password),// Băm mật khẩu bằng bcrypt
        });

        return this.userRepository.save(newUser);
      }
}
