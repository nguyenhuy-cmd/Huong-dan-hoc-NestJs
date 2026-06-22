import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "./create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    
    @ApiProperty({
        description: 'Tiêu đề bài viết',
        example: 'Tiêu đề bài viết',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsString({ message: 'Tiêu đề phải là chuỗi' })
    @MinLength(4, { message: 'Tiêu đề phải có ít nhất 4 ký tự' })
    @IsNotEmpty({message: 'Tiêu đề không được để trống'})
    title: string;
    
    @ApiProperty({
        enum: postType,
        description: 'Loại bài viết',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsEnum(postType, { message: 'Loại bài viết không hợp lệ'})
    @IsNotEmpty({message: 'Loại bài viết không được để trống'})
    postType: postType;

    @ApiProperty({
        description: 'Slug bài viết',
        example: 'slug-bai-viet',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsString({ message: 'Slug phải là chuỗi' })
    @IsNotEmpty({message: 'Slug không được để trống'})
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{ message: 'Slug không được chứa ký tự đặc biệt' })
    slug: string;

    @ApiProperty({
        enum: postStatus,
        description: 'Trạng thái bài viết',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính bắt buộc
    @IsEnum(postStatus, { message: 'Trạng thái bài viết không hợp lệ'})
    @IsNotEmpty({message: 'Trạng thái bài viết không được để trống'})
    status: postStatus;

    @ApiPropertyOptional({
        description: 'Nội dung bài viết',
        example: 'Nội dung bài viết',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsString({ message: 'Nội dung phải là chuỗi' })
    @IsOptional({message: 'Nội dung có thể để trống'})
    content?: string;

    @ApiPropertyOptional({
        description: 'Schema bài viết',
        example: 'Schema bài viết',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsString({ message: 'Schema phải là chuỗi' })
    @IsOptional({message: 'Schema có thể để trống'})
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'URL ảnh đại diện',
        example: 'https://example.com/image.jpg',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsString({ message: 'URL ảnh phải là chuỗi' })
    @IsOptional({message: 'URL ảnh có thể để trống'})
    @IsUrl()
    featuredImageURL?:string;

    @ApiPropertyOptional({
        description: 'Ngày xuất bản',
        example: '2022-01-01',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsISO8601()
    @IsOptional({message: 'Ngày xuất bản có thể để trống'})
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'Tags bài viết',
        example: 'tag1,tag2,tag3',
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsString({ each: true, message: 'Tags phải là mảng chuỗi' })
    @IsOptional()
    @IsArray()
    @MinLength(3, { each: true, message: 'Tags phải có ít nhất 3 ký tự' })
    tags?:string[];

    @ApiPropertyOptional({
        description: 'Meta options bài viết',
        example: [
            {
                key: 'meta1',
                value: 'value1'
            },
            {
                key: 'meta2',
                value: 'value2'
            }
        ],
        required: false, // Dùng để chỉ định thuộc tính có bắt buộc hay không, nếu bằng false thì thuộc tính sẽ là không bắt buộc
        type: 'array',
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    description: 'Key của meta options',
                    example: 'meta1',
                },
                value: {
                    type: 'string',
                    description: 'Value của meta options',
                    example: 'value1',
                }
            }
        }
    })// Dùng để xuất hiện trong Swagger UI và là thuộc tính không bắt buộc
    @IsOptional({message: 'Meta options có thể để trống'})
    @IsArray({message: 'Meta options phải là mảng'})
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto[]
    
}

// ApiPropertyOptional và ApiProperty chỉ là các giá trị mẫu cho Swagger UI và có thể thay đổi tùy ý 
