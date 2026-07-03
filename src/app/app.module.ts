import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { PostModule } from '../post/post.module';
import { AuthModule } from '../auth/auth.module';
import { TagsModule } from '../tags/tags.module';
import { MetaOptionsModule } from '../meta-options/meta-options.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import environValidation from 'src/config/environ.validation';

const ENV = process.env.NODE_ENV;// Lấy ra trạng thái môi trường hiện tại mà ứng dụng đang chạy

@Module({
  imports: [UsersModule, PostModule, AuthModule, TagsModule, MetaOptionsModule,
    ConfigModule.forRoot({
      isGlobal: true,// Đăng kí ConfigModule trên toàn ứng dụng
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,// Toán tử 3 ngôi: nết biến env không có giá trị thì chọn env còn nếu có giá trị thì chọn .env.development 
      load:[appConfig, databaseConfig], // nạp tệp cấu hình vào 
      validationSchema: environValidation,// Sử dụng Joi schema để kiểm tra env variables trước khi app chạy
    }),// Đăng kí ConfigModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],// Tùy chọn: Import các module khác nếu cần tiêm ConfigModule
      inject: [ConfigService],// Tùy chọn: Injection các Service khác: ConfigService
      useFactory: (configService: ConfigService) => ({// useFactory được tiêm vào ConfigModule thông qua ConfigService 
        type: 'postgres',   // Hệ quản trị cơ sở dữ liệu
        entities: [User], // Các Entity (Bảng) được nạp vào hệ thống
        host: configService.get('database.host'), // Chạy dưới máy local là localhost
        port: +configService.get('database.post'),   //Dấu + là thay đổitừ chữ thành số ,Cổng mặc định của PostgreSQL
        username: configService.get('database.user'), // Tài khoản mặc định lúc cài đặt
        password: configService.get('database.password'), // Mật khẩu bạn đã đặt lúc cài PostgreSQL
        database: configService.get('database.name'), // Tên database bạn đã tạo trong PostgreSQL
        autoLoadEntities: configService.get('database.autoLoadEntities'), // Tự động quét và nạp các Entity (Bảng) vào hệ thống
        synchronize: configService.get('database.synchronize'),// Tự động tạo bảng dưới Database dựa trên code Entity (Chỉ bật khi code ở local)
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
