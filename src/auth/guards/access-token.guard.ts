import { JwtService } from '@nestjs/jwt';// JwtService dùng để verify token
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';// import type vì ConfigType chỉ dùng làm type (isolatedModules + emitDecoratorMetadata)
import jwtConfig from '../config/jwt.config';// Config JWT (secret, audience, issuer, TTL)
import { REQUEST_USER_KEY } from '../constants/auth.constants';// Key để gắn user payload vào request

// AuthGuard = guard xác thực JWT, NestJS gọi tự động trước mỗi request
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,// Inject JwtService để verify token

    // Inject config jwt namespace -> lấy secret, audience, issuer
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ){}

  // NestJS gọi hàm này để kiểm tra request có được phép đi tiếp không
  async canActivate(
    context: ExecutionContext,// Ngữ cảnh thực thi (chứa request, response...)
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();// Lấy request object từ HTTP context
    const token = this.extractRequestFromHeader(request);// Lấy JWT token từ header Authorization

    // Không có token -> từ chối truy cập
    if(!token){
      throw new UnauthorizedException('Token không được cung cấp')
    }

    try{ 
      // Verify token với jwtService, dùng config đã inject
      const payload = await this.jwtService.verifyAsync(
        token, 
        this.jwtConfiguration
      )
      // Gắn payload (user info) vào request để controller/dịch vụ dùng sau
      request[REQUEST_USER_KEY] = payload;
    }catch(error){
      // Token hết hạn, sai chữ ký, hoặc không hợp lệ
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn')
    }

    return true;// Cho phép request đi tiếp
  }

  // Trích xuất token từ header Authorization (format: "Bearer <token>")
  private extractRequestFromHeader(request: any): string | undefined{
    const [_, token] = request.headers.authorization?.split(' ') ?? [];// Tách "Bearer <token>" -> lấy <token>
    return token;
  }
}
