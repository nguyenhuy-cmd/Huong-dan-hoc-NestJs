import { registerAs } from '@nestjs/config';
// Tệp cấu hình tùy chỉnh



export default registerAs('appConfig', ()=> ({
    environment:process.env.NODE_ENV || 'production',//  nếu có cấu hình node_env thì dùng không thì là production đúng không 
}))
