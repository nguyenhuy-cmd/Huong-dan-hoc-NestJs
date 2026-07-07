import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}

    async findOneByEmail(email: string){
        let user: User | null = null;// findOneBy trả về User | null (không phải undefined)
        
        try{
             user = await this.usersRepository.findOneBy({
               email: email, 
            })
        }catch(error){
            throw new RequestTimeoutException(error, {
                description: 'Không tìm thấy người dùng'
            })
        }
        if(!user){
            throw new UnauthorizedException('Người dùng không tồn tại')
        }
        return user;
    }
}

