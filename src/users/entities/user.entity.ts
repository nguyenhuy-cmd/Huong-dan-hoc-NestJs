import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()// Tự động tăng
    id: number;

    @Column({// Column là các trường dữ liệu của bảng
        type:'varchar', 
        length:100, 
        nullable: false // Không được để trống
    })
    name: string;

    @Column({
        type:'varchar', 
        length:100, 
        nullable: false, // Không được để trống
        unique:true // Không được trùng lặp nếu đã tồn tại
    })
    email: string;

    @Column({
        type:'int', // Số nguyên có thể âm dương
        nullable: false // Không được để trống
    })
    age: number;

    @Column({
        type:'varchar', 
        length:100,
        nullable: false // Không được để trống
    })
    password: string;
}
