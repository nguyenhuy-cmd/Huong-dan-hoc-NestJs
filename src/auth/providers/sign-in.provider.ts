import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './../dto/signin.dto';
import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SignInProvider {
    constructor(
        private readonly usersService: UsersService,// Inject trực tiếp, không cần forwardRef

        private readonly hashingProvider: HashingProvider,// Inject HashingProvider để so sánh password
    ){}
    async signIn (signInDto: SignInDto){
        const user = await this.usersService.findOneByEmail(signInDto.email);// Tìm user theo email

        // So sánh mật khẩu với hash
        let isEqual: boolean = false;

        try{
            isEqual = await this.hashingProvider.comparePassword(
                signInDto.password,// Mật khẩu thô người dùng nhập
                user.password// Mật khẩu đã hash trong database
            );
        }catch(error){
            throw new RequestTimeoutException(error, {
                description: 'Không thể so sánh các mật khẩu'
            })
        }
        if(!isEqual){
            throw new UnauthorizedException('Mật khẩu không chính xác')
        }
        return true;
    }

}
