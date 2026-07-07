import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto{
    @IsOptional()// Có thể tùy chọn có hoặc không
    @IsPositive()// lệnh kiểm tra xem giá trị số gửi lên có phải là số dương (lớn hơn 0) hay không.
    //Đã có chuyển đổi ngầm kp dùng Type để chuyển đổi nữa
    limit?: number = 10;

    @IsOptional()// Có thể tùy chọn có hoặc không
    @IsPositive()// lệnh kiểm tra xem giá trị số gửi lên có phải là số dương (lớn hơn 0) hay không.
    //Đã có chuyển đổi ngầm kp dùng Type để chuyển đổi nữa
    page?: number = 1;
}