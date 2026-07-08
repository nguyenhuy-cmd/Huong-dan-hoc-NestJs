import { ConfigModule, ConfigType } from '@nestjs/config';// ConfigModule dùng để load config (jwt), ConfigType để lấy kiểu config
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';// Service xác thực
import { AuthController } from './auth.controller';// Controller xác thực
import { UsersModule } from 'src/users/users.module';// UsersModule cần để dùng UsersService
import { HashingProvider } from './providers/hashing.provider';// Abstract class hash password
import { BcryptProvider } from './providers/bcrypt.provider';// Class cụ thể hash bằng bcrypt
import { SignInProvider } from './providers/sign-in.provider';// Provider xử lý đăng nhập
import jwtConfig from './config/jwt.config';// Config JWT (secret, audience, issuer, TTL)
import { JwtModule } from '@nestjs/jwt';// Module JWT của NestJS để tạo/xác thực token

@Module({
  imports: [
    UsersModule, // Import để dùng UsersService
    ConfigModule.forFeature(jwtConfig), // Load config jwt (secret, audience...)
    // Đăng ký JwtModule với config từ jwtConfig (dùng factory để inject config)
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],// Load jwtConfig vào scope của JwtModule
      inject: [jwtConfig.KEY],// Lấy giá trị config theo KEY (namespace 'jwt')
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,// Khóa bí mật từ config
        signOptions: {
          audience: config.audience,// Đối tượng sử dụng token
          issuer: config.issuer,// Đơn vị phát hành token
          expiresIn: Number(config.accessTokenTll),// Ép sang số (giây) vì expiresIn cần number, không phải string
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,// Service xác thực
    BcryptProvider,// Class hash password cụ thể
    { provide: HashingProvider, useExisting: BcryptProvider },// Ánh xạ HashingProvider (abstract) → BcryptProvider (cụ thể)
    SignInProvider// Provider xử lý logic đăng nhập
  ],
  exports: [AuthService, BcryptProvider],// Export để các module khác (vd: UsersModule) có thể inject
})
export class AuthModule { }
