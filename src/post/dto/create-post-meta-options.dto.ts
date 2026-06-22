import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOptionsDto {
    @IsString({message:'Key phải là chuỗi'})
    @IsNotEmpty({message:'Key không được để trống'})
    key: string;

    @IsNotEmpty({message:'Value không được để trống'})
    value: any;
}