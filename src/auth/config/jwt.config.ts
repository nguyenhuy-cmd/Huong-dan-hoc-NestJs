import { registerAs } from "@nestjs/config";// registerAs = đăng ký config với Namespace 'jwt'

// Cấu hình JWT (JSON Web Token) - dùng để tạo và xác thực token
export default registerAs('jwt', ()=> {
    return {
        secret: process.env.JWT_SECRET,// Khóa bí mật dùng để ký token (lấy từ .env)
        audience: process.env.JWT_TOKEN_AUDIENCE,// Đối tượng được cấp token (vd: tên app)
        issuer: process.env.JWT_TOKEN_ISSUER,// Đơn vị phát hành token (vd: tên backend)
        accessTokenTll: process.env.JWT_ACCESS_TOKEN_TTL ?? '3600',// Thời gian sống của token (mặc định 3600s = 1h)
    }
})