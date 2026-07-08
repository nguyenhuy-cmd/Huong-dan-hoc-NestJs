import { ConfigService } from '@nestjs/config';
import type { ConfigType } from '@nestjs/config';// import type vì ConfigType chỉ dùng làm type
import { JwtService } from '@nestjs/jwt';// JwtService dùng để tạo và xác thực token
import { HashingProvider } from 'src/auth/providers/hashing.provider';// Abstract class hashPassword/comparePassword
import { UsersService } from 'src/users/users.service';// UsersService để tìm user theo email
import { SignInDto } from './../dto/signin.dto';// DTO đăng nhập (email + password)
import { Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';// Config JWT (secret, audience, issuer, TTL)

// SignInProvider = xử lý logic đăng nhập: tìm user → so sánh password → tạo token JWT
@Injectable()
export class SignInProvider {
    constructor(
        private readonly usersService: UsersService,// Dùng để tìm user trong DB theo email

        private readonly hashingProvider: HashingProvider,// Dùng để so sánh password nhập vào vs hash trong DB

        private readonly jwtService: JwtService,// Dùng để tạo JWT token sau khi đăng nhập thành công

        @Inject(jwtConfig.KEY)// Lấy config jwt (namespace 'jwt') đã đăng ký qua registerAs
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,// Chứa secret, audience, issuer, accessTokenTll
    ){}

    // Hàm đăng nhập chính
    async signIn (signInDto: SignInDto){
        // Bước 1: Tìm user theo email
        const user = await this.usersService.findOneByEmail(signInDto.email);

        // Bước 2: So sánh mật khẩu nhập vào với mật khẩu đã hash trong DB
        let isEqual: boolean = false;

        try{
            isEqual = await this.hashingProvider.comparePassword(
                signInDto.password,// Mật khẩu thô người dùng nhập
                user.password// Mật khẩu đã hash lưu trong database
            );
        }catch(error){
            // Lỗi database timeout, disconnect...
            throw new RequestTimeoutException(error, {
                description: 'Không thể so sánh các mật khẩu'
            })
        }

        // Nếu mật khẩu sai → throw UnauthorizedException
        if(!isEqual){
            throw new UnauthorizedException('Mật khẩu không chính xác')
        }

        // Bước 3: Đăng nhập thành công → tạo JWT token
       const accessToken = await this.jwtService.signAsync(
        {
        sub: user.id,// sub (subject) = id của user, dùng để xác định user khi giải mã token
        email: user.email,// Email để tiện tra cứu
       },
       {
        audience: this.jwtConfiguration.audience,// Đối tượng sử dụng token (từ config)
        issuer: this.jwtConfiguration.issuer,// Đơn vị phát hành token (từ config)
        secret: this.jwtConfiguration.secret,// Khóa bí mật ký token (từ config)
        expiresIn: Number(this.jwtConfiguration.accessTokenTll)// Thời gian sống của token (giây), ép sang number
       }
    )
    return accessToken;// Trả về token cho client
    }

}
