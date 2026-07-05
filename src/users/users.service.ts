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
import { error } from 'console';
import { DataSource } from 'typeorm';
import { UsersCreateManyServiceTs } from './users-create-many.service';
import { CreateManyUsersDto } from './dto/create-many-user.dto';
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

  ){}

  async create(createUserDto: CreateUserDto) {
    const user = undefined;
    try{// Dùng để bắt lỗi database
    await this.userRepository.findOne({where:{email: createUserDto.email}});
    if(user){
      throw new BadRequestException('Email đã tồn tại');
    }}catch(error){
      // lưa chi tiết ngoại lệ vào cơ sở dữ liệu của bạn
      throw new RequestTimeoutException((
        'Không thể xử lí yêu cầu của bạn vào lúc này'),
        {
          description: 'Lỗi kết nối tới cơ sở dữ liệu'
        }
      )
    }
    
    const newUser = this.userRepository.create(createUserDto);// tạo 1 đối tượng User mới từ CreateUserDto
    return this.userRepository.save(newUser);// Lưu vào database
  }
  async findAll(
    getUserParamsDto: getUsersParamsDto, 
    limit: number, 
    page: number) {
      // ném ngoại lệ tùy chỉnh
      throw new HttpException({
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'Đường dẫn API không tồn tại'
      },
         HttpStatus.MOVED_PERMANENTLY 
    ),
    {// tham số tùy chọn và không gửi cho người dùng
      cause: new Error(),
      description: 'Xảy ra do đường dẫn API đã bị di chuyển vĩnh viễn'
    }
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
    // Thêm hàm này vào trong file users.service.ts của bạn nhé
  async findOneById(id: number) {
    const user = undefined;
try{// Dùng để bắt lỗi database
    const user =  await this.userRepository.findOneBy({ id });
    if(!user){
      throw new BadRequestException('Không tìm thấy người dùng');
    }
    } catch(error){
      // lưa chi tiết ngoại lệ vào cơ sở dữ liệu của bạn
      throw new RequestTimeoutException((
        'Không thể xử lí yêu cầu của bạn vào lúc này'),
        {
          description: 'Lỗi kết nối tới cơ sở dữ liệu'
        }
      )
    }
    return user;
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
}
