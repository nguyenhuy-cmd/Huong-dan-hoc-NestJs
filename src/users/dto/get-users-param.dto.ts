import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class getUsersParamsDto {
    @ApiPropertyOptional(
        {
            example: '1', // Thêm ví dụ cho id 
            description: 'id của user' // Thêm mô tả cho id 
        }
    )// Tạo ra tham số id trong swagger và thêm mô tả 
    @IsOptional()// làm cho id là tuỳ chọn không bắt buộc phải có 
    @IsInt({ message: 'id phải là số nguyên' }) // Kiểm tra xem id có phải là số nguyên không 
    @Type(() => Number) // Chuyển đổi id sang số nguyên 
    id: Number

    @IsOptional()// làm cho age là tuỳ chọn không bắt buộc phải có 
    @IsInt({ message: 'age phải là số nguyên' }) // Kiểm tra xem age có phải là số nguyên không 
    @Type(() => Number) // Chuyển đổi age sang số nguyên 
    age: Number
}