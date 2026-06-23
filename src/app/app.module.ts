import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { PostModule } from '../post/post.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [UsersModule, PostModule, AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],// Tùy chọn: Import các module khác nếu cần tiêm ConfigModule
      inject: [],// Tùy chọn: Injection các Service khác
      useFactory: () => ({// useFactory được tiêm vào ConfigModule thông qua ConfigService 
        type: 'postgres',   // Hệ quản trị cơ sở dữ liệu
        entities: [User, Post], // Các Entity (Bảng) được nạp vào hệ thống
        host: 'localhost', // Chạy dưới máy local là localhost
        port: 5432,   // Cổng mặc định của PostgreSQL
        username: 'postgres', // Tài khoản mặc định lúc cài đặt
        password: 'Nguyenanhhuy2003', // Mật khẩu bạn đã đặt lúc cài PostgreSQL
        database: 'nestjspostgresdb', // Tên database bạn đã tạo trong PostgreSQL
        autoLoadEntities: true, // Tự động quét và nạp các Entity (Bảng) vào hệ thống
        synchronize: true,// Tự động tạo bảng dưới Database dựa trên code Entity (Chỉ bật khi code ở local)
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
