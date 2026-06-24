import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString, IsUrl, Matches } from "class-validator";

export class CreateTagsDto {
    @ApiProperty() //dùng để tự động tạo tài liệu(swagger)
    @IsNotEmpty({ message: 'Name không được để trống' })
    @IsString({ message: 'Name phải là chuỗi' })
    name: string;

    @ApiProperty({
        description: 'Slug của tag',
        example: 'tag-1',

    })//dùng để tự động tạo tài liệu(swagger)
    @IsNotEmpty({ message: 'Slug không được để trống' })
    @IsString({ message: 'Slug phải là chuỗi' })
    @Matches(/^[a-z0-9-]+$/, { message: 'Slug không được chứa ký tự đặc biệt' })
    slug: string;

    @ApiProperty()//dùng để tự động tạo tài liệu(swagger)
    @IsNotEmpty({ message: 'Description không được để trống' })
    @IsString({ message: 'Description phải là chuỗi' })
    description?: string;

    @ApiProperty()//dùng để tự động tạo tài liệu(swagger)
    @IsNotEmpty({ message: 'Schema không được để trống' })
    @IsJSON({ message: 'Schema phải là chuỗi JSON' })
    schema?: string;

    @ApiProperty()//dùng để tự động tạo tài liệu(swagger)
    @IsNotEmpty({ message: 'FeaturedImageUrl không được để trống' })
    @IsUrl({}, { message: 'FeaturedImageUrl phải là đường dẫn URL' })
    featuredImageUrl?: string;
}