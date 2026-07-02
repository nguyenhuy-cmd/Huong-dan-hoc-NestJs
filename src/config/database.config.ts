import { registerAs } from "@nestjs/config";


export default registerAs ('database', ()=> ({
    host: process.env.HOST || 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    name: process.env.NAME,
    post: process.env.POST || 5432,
    synchronize: process.env.SYNC === 'true' ? true : false,// Nếu cấu hình là chuỗi 'true' chuyển thành giá trị logic true và được đồng bộ với database và ngược lại
    autoLoadEntities: process.env.AUTOLOAD === 'true' ? true : false,// 
}))