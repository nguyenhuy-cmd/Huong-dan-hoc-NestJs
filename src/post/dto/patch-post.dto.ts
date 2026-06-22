import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {// PartialType nghĩa là kế thừa tất cả các thuộc tính của CreatePostDto và làm cho tất cả các thuộc tính trở thành tùy chọn
    @ApiProperty({
        type: Number, // Dùng để chỉ định kiểu dữ liệu của thuộc tính
        description: 'ID của bài viết',
    })   
    @IsNumber({},{message:'Id phải là số'})   
    @IsNotEmpty({message:'Id không được để trống'})
    id: number;  
    }