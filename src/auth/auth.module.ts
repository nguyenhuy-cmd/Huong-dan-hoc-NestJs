import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // nhận service UsersService để sử dụng
  controllers: [AuthController],
  providers: [AuthService],
  exports: [UsersModule, AuthService], // Sử dụng UsersModule để có thể sử dụng các controller và service của UsersModule
})
export class AuthModule { }
