import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,// Không được trùng tên
        nullable: false,// Không được để trống
        
})
    name: string;


    @Column({
        type: 'varchar',
        length: 255,
        unique: true,// Không được trùng tên
        nullable: false,// Không được để trống
})
    slug:string;

    @Column({
        type:'text',
        nullable: true,//Được để trống 
    })
    description?: string

    @Column({
        type:'text',
        nullable: true,// Được để trống
    })
    schema?: string;

    @Column({
        type:'varchar',
        length:255,
        nullable:true,// Được để trống
    })
    featuredImageUrl?: string
    
   
    @CreateDateColumn()// Cột tự động tạo khi tạo    
    createDate: Date;// 

    @UpdateDateColumn()// Cột tự động cập nhật khi update
    updateDate: Date;

    // Xóa mềm 
    @DeleteDateColumn()// Cột tự động cập nhật khi xóa
    dateledAt: Date;
}