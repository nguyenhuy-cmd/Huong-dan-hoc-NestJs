import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyServiceTs } from './users-create-many.service';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyServiceTs],
  exports: [UsersService], // Xuất service cho các module khác sử dụng (như AuthModule)
  imports: [TypeOrmModule.forFeature([User]),
  ConfigModule.forFeature(profileConfig)
],// Đăng ký entity vào module
})
export class UsersModule { }
