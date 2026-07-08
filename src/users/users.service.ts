import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getUsersParamsDto } from './dto/get-users-param.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import type { ConfigType } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { DataSource } from 'typeorm';
import { UsersCreateManyServiceTs } from './users-create-many.service';
import { CreateUserService } from './create-user.service';
import { CreateManyUsersDto } from './dto/create-many-user.dto';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
@Injectable()
export class UsersService {
  constructor(
    // Tiêm userRepository vao service 
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private configService: ConfigService,

    @Inject(profileConfig.KEY)//hãy lấy config đã đăng ký registerAS với tên 'profileConfig' và tiêm vào đây cho tôi 
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    //iêm (Inject) nguồn dữ liệu
    private readonly  dataSource: DataSource,// nguồn dữ liệu này đc nhập từ typeorm

    // Tiêm userCreateMany
    private readonly usersCreateManyServiceTs: UsersCreateManyServiceTs,

    private readonly createUserService: CreateUserService,// Inject CreateUserService (không phải CreateUserDto)

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ){}

  // Tạo user mới
  async create(createUserDto: CreateUserDto) {
     return this.createUserService.create(createUserDto)// Gọi method create của CreateUserService
  }

  async findAll(
    getUserParamsDto: getUsersParamsDto, 
    limit: number, 
    page: number) {
      // Ném ngoại lệ tùy chỉnh (API không tồn tại, đã bị di chuyển)
      throw new HttpException({
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'Đường dẫn API không tồn tại'
      },
        HttpStatus.MOVED_PERMANENTLY,
        { cause: new Error(), description: 'Đường dẫn API đã bị di chuyển vĩnh viễn' }
      );
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
    // const user = this.userRepository.findOne({where:{id}});
    // if(!user){
    //   throw new BadRequestException('Không tìm thấy người dùng');
    // }
    // return user;
  }
  // Tìm user bằng id
  async findOneById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });// Tìm user trong database theo id
      if (!user) {
        throw new BadRequestException('Không tìm thấy người dùng');// Nếu không có → báo lỗi
      }
      return user;// Trả về user tìm được
    } catch (error) {
      // Lỗi khác (database timeout, disconnect...)
      throw new RequestTimeoutException(
        'Không thể xử lí yêu cầu của bạn vào lúc này',
        { description: 'Lỗi kết nối tới cơ sở dữ liệu' }
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createMany(createManyUsersDto: CreateManyUsersDto){
  return await this.usersCreateManyServiceTs.createMany(createManyUsersDto);// lấy 

  }

  async findOneByEmail(email: string){
    return await this.findOneUserByEmailProvider.findOneByEmail(email)
  }
}
