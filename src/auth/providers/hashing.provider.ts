import { Injectable } from '@nestjs/common';

// Abstract class = class không thể khởi tạo trực tiếp, chỉ dùng làm "bản thiết kế" cho các class con kế thừa
// @Injectable() = cho phép NestJS tiêm (inject) class này vào các nơi cần sử dụng
// HashingProvider = định nghĩa các phương thức liên quan đến mã hóa mật khẩu, class con sẽ implement (triển khai) các phương thức này
@Injectable()
export abstract class HashingProvider {

    // Abstract method = không có thân hàm, class con BẮT BUỘC phải viết lại logic cho phương thức này
    // hashPassword = mã hóa mật khẩu: nhận vào mật khẩu thô (string), trả về mật khẩu đã mã hóa (Promise<string>)
    // Ví dụ: "123456" → "$2b$10$abcxyz..." (bcrypt hash)
    abstract hashPassword(data: string): Promise<string>;

    // comparePassword = so sánh mật khẩu: kiểm tra mật khẩu nhập vào có khớp với mật khẩu đã mã hóa không
    // data = mật khẩu người dùng nhập vào (thô, chưa mã hóa)
    // encrypted = mật khẩu đã mã hóa lưu trong database
    // Trả về true nếu khớp, false nếu không khớp
    abstract comparePassword(
        data: string,
        encrypted: string,
    ): Promise<boolean>;

}
