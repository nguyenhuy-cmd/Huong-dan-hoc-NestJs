import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MinLength(1, { message: 'Tên không được để trống' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email không được để trống' })
  @MinLength(1,{message:'Email không được để trống'})
  @MaxLength(100,{message:'Email phải nhỏ hơn hoặc bằng 100'})
  email: string;

  @IsInt({ message: 'Tuổi phải là số nguyên' })
  @IsNotEmpty({ message: 'Tuổi không được để trống' })
  @MinLength(1,{message:'Tuổi phải lớn hơn hoặc bằng 1'})
  age: number
}
