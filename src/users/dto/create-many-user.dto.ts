import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManyUsersDto {
    @ApiProperty({
        type: 'array',// Kiểu dữ liệu là mảng
        required: true,     // Trường này bắt buộc phải có
        items:{
            type: 'User'    // Mỗi item trong mảng có kiểu là User
}})
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })// bắt buộc phải là 1 mảng
    @Type(() => CreateUserDto)// nghĩa là nó phải có đủ các giá trị  của các CreateUserDto
    users: CreateUserDto[];
}