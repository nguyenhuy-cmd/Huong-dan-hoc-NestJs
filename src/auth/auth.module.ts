import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  imports: [UsersModule],// Import UsersModule để AuthService dùng UsersService
  controllers: [AuthController],
  providers: [AuthService,
    BcryptProvider,
    { provide: HashingProvider, useExisting: BcryptProvider },
    SignInProvider
  ],
  exports: [AuthService, BcryptProvider],
})
export class AuthModule { }
