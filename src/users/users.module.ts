import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyServiceTs } from './users-create-many.service';
import { CreateUserService } from './create-user.service';
import profileConfig from './config/profile.config';
import { BcryptProvider } from 'src/auth/providers/bcrypt.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import jwtConfig from 'src/auth/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/access-token.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    UsersCreateManyServiceTs, 
    CreateUserService, 
    BcryptProvider, 
    FindOneUserByEmailProvider,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],// Đăng ký BcryptProvider trực tiếp để CreateUserService dùng
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]),
  ConfigModule.forFeature(profileConfig),
  ConfigModule.forFeature(jwtConfig),// Đăng ký jwtConfig để AuthGuard có thể inject CONFIGURATION(jwt)
  JwtModule.registerAsync(jwtConfig.asProvider() )
],
})
export class UsersModule { }
