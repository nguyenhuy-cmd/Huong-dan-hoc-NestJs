import { error } from 'console';
import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateManyUsersDto } from './dto/create-many-user.dto';

@Injectable()
export class UsersCreateManyServiceTs {
    constructor(
    private readonly  dataSource: DataSource,// nguồn dữ liệu này đc nhập từ typeorm
   ){} 
   async createMany(createManyUsersDto: CreateManyUsersDto){
        const newUser: User[] = [];
        // Tạo một đối tượng (instance) Query Runner. 
        // (Thằng này giống như việc bạn mở một cổng riêng để tự tay điều khiển các câu lệnh SQL).
        const queryRunner = this.dataSource.createQueryRunner(); // createQueryRunner là hàm → phải có ()
        try{
          
    
        //Kết nối Query Runner với nguồn dữ liệu (DataSource/Database). 
        //(Nhận diện kết nối vào DB).
        await queryRunner.connect();
        //Bắt đầu một Giao dịch (Transaction). 
        // (Kể từ bước này, mọi lệnh thêm, sửa, xóa sẽ được
        await queryRunner.startTransaction();
        }
        catch(error){
          throw new RequestTimeoutException('Không thể kết nối với cơ sở dữ liệu')
        }
        
        try{
          for(const user of createManyUsersDto.users){
            const createdUser = queryRunner.manager.create(User, user); // đổi tên để tránh trùng biến newUser bên ngoài
            const result = await queryRunner.manager.save(createdUser);
            newUser.push(result); // push vào mảng newUser bên ngoài
          }
          // Nếu thành công thì Commit (Xác nhận lưu vĩnh viễn dữ liệu vào Database)
          await queryRunner.commitTransaction();
    
        }catch(error){
        //Nếu không thành công (gặp lỗi) thì Rollback (Hủy bỏ toàn bộ, khôi phục lại trạng thái ban đầu như chưa có chuyện gì xảy ra).
        await queryRunner.rollbackTransaction();
        throw new ConflictException('Không thể hoàn thành giao dịch',{
          description: String(error)// Chuyển đổi toàn bộ đối tượng lỗi (error) thành một chuỗi văn bản (String) thông thường để thông báo cho chúng ta
        });
        }finally{//  dùng để nơi để dọn dẹp hoặc giải phóng tài nguyên sau khi công việc kết thúc, bất kể thành công hay thất bại.
          try{
            // Giải phóng/Đóng kết nối. (Trả lại cổng kết nối cho hệ thống để tiết kiệm tài nguyên).
          await queryRunner.release();
          }catch(error){
            throw new RequestTimeoutException('Không thể giair phóng kết nối',{
              description: String(error)// Chuyển đổi toàn bộ đối tượng lỗi (error) thành một chuỗi văn bản (String) thông thường để thông báo cho chúng ta
            })
          }
          
        }
    return newUser;
      }
      
}
