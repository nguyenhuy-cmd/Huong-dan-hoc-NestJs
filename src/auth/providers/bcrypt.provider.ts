import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import bcrypt from 'bcryptjs'; // Import default vì bcryptjs v3 exports default

// BcryptProvider = class CON triển khai HashingProvider bằng thư viện bcryptjs
// implements = BẮT BUỘC viết lại toàn bộ abstract method từ父class
// @Injectable() = NestJS có thể inject class này vào nơi cần hashing
@Injectable()
export class BcryptProvider implements HashingProvider {

    // Mã hóa mật khẩu thô thành hash
    // data = mật khẩu gốc (vd: "123456")
    // salt = chuỗi ngẫu nhiên chống tấn công rainbow table
    // Trả về chuỗi hash đã mã hóa (vd: "$2b$10$abc...")
    async hashPassword(data: string): Promise<string> {
        const salt = await bcrypt.genSalt();// Tạo salt ngẫu nhiên
        return await bcrypt.hash(data, salt);// Mã hóa data bằng salt
    }

    // So sánh mật khẩu nhập vào vs hash trong database
    // data = mật khẩu người dùng nhập (thô)
    // encrypted = mật khẩu đã hash lưu trong DB
    // Trả về true nếu khớp, false nếu sai
    async comparePassword(data: string, encrypted: string): Promise<boolean> {
        return await bcrypt.compare(data, encrypted);// So sánh thô vs hash
    }
}
