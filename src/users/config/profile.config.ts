// Đây là cấu hình 1 phần chứ không phải tổng thể 
import { registerAs } from "@nestjs/config";
export default registerAs('profileConfig', () => ({
    apiKey: process.env.PROFILE_API_KEY,
} as const));