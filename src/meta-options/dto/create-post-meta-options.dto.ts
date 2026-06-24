import { IsJSON, IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOptionsDto {
    @IsNotEmpty({ message: 'MetaValue không được để trống' })
    @IsJSON({ message: 'MetaValue phải là chuỗi JSON' })
    metaValue: string;
}