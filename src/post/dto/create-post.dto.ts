import { IsArray, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "../../meta-options/dto/create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    
    @ApiProperty({
        description: 'Tiêu đề bài viết',// description dùng để mô tả cho Swagger UI
        example: 'Tiêu đề bài viết',// example là dữ liệu mẫu cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsString({ message: 'Tiêu đề phải là chuỗi' })
    @MinLength(4, { message: 'Tiêu đề phải có ít nhất 4 ký tự' })
    @IsNotEmpty({message: 'Tiêu đề không được để trống'})
    title: string;
    
    @ApiProperty({
        enum: postType,// Enum là một kiểu dữ liệu trong TypeScript cho phép định nghĩa một tập hợp các giá trị cố định 
        description: 'Loại bài viết',// description dùng để mô tả cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsEnum(postType, { message: 'Loại bài viết không hợp lệ'})
    @IsNotEmpty({message: 'Loại bài viết không được để trống'})
    postType: postType;

    @ApiProperty({
        description: 'Slug bài viết',// description dùng để mô tả cho Swagger UI
        example: 'slug-bai-viet',// example là dữ liệu mẫu cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsString({ message: 'Slug phải là chuỗi' })
    @IsNotEmpty({message: 'Slug không được để trống'})
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{ message: 'Slug không được chứa ký tự đặc biệt' })
    slug: string;

    @ApiProperty({
        enum: postStatus,// Enum là một kiểu dữ liệu trong TypeScript cho phép định nghĩa một tập hợp các giá trị cố định 
        description: 'Trạng thái bài viết',// description dùng để mô tả cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsEnum(postStatus, { message: 'Trạng thái bài viết không hợp lệ'})
    @IsNotEmpty({message: 'Trạng thái bài viết không được để trống'})
    status: postStatus;

    @ApiPropertyOptional({
        description: 'Nội dung bài viết',// description dùng để mô tả cho Swagger UI
        example: 'Nội dung bài viết',// example là dữ liệu mẫu cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsString({ message: 'Nội dung phải là chuỗi' })
    @IsOptional({message: 'Nội dung có thể để trống'})
    content?: string;

    @ApiPropertyOptional({
        description: 'Schema bài viết',// description dùng để mô tả cho Swagger UI
        example: 'Schema bài viết',// example là dữ liệu mẫu cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsString({ message: 'Schema phải là chuỗi' })
    @IsOptional({message: 'Schema có thể để trống'})
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'URL ảnh đại diện',// description dùng để mô tả cho Swagger UI
        example: 'https://example.com/image.jpg',// example là dữ liệu mẫu cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsString({ message: 'URL ảnh phải là chuỗi' })
    @IsOptional({message: 'URL ảnh có thể để trống'})
    @IsUrl()
    featuredImageURL?:string;

    @ApiPropertyOptional({
        description: 'Ngày xuất bản',// description dùng để mô tả cho Swagger UI
        example: '2022-01-01',// example là dữ liệu mẫu cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsISO8601()
    @IsOptional({message: 'Ngày xuất bản có thể để trống'})
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'Tags bài viết',// description dùng để mô tả cho Swagger UI
        example: [1, 2, 3] // example là dữ liệu mẫu cho Swagger UI
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsInt({each: true, message: 'Tags phải là mảng số' })// each dùng để validate từng phần tử trong mảng
    @IsOptional()
    @IsArray()
    tags?:number[];

    @ApiPropertyOptional({
        type:'object',// type là kiểu dữ liệu trong Swagger UI
        // @ApiPropertyOptional đã tự động là optional, không cần required: false
        properties: {
            metaValue: {
                type: 'string', // JSON được truyền dưới dạng string
                description: 'MetaValue của meta options bài viết',// description dùng để mô tả cho Swagger UI
                example: '{"sidebarEnabled": true}',
            },
        }
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsOptional({message: 'Meta options có thể để trống'})
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto; // Optional: có thể không truyền lên

    @ApiProperty({
        description: 'AuthId bài viết',// description dùng để mô tả cho Swagger UI
        required: true,// là bắt buộc trong Swagger UI
        example: 1// Dữ liệu mẫu do bạn tự nghĩ ra để hiển thị lên giao diện Swagger UI cho người ta xem và bấm test cho nhanh
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsInt({message: 'AuthId phải là số nguyên'})
    @IsNotEmpty({message: 'AuthId không được để trống'})
    authId: number; //userId - để biết bài post thuộc về user nào
    
}

// ApiPropertyOptional và ApiProperty chỉ là các giá trị mẫu cho Swagger UI và có thể thay đổi tùy ý 
