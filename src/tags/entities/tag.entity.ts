import { Post } from "src/post/entities/post.entity";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    
    @ManyToMany(() => Post, (post) => post.tags,{
        onDelete: 'CASCADE' // Khi xóa tag thì xóa luôn post            
    })
    post: Post[];
   
    @CreateDateColumn()// Cột tự động tạo khi tạo    
    createDate: Date;// 

    @UpdateDateColumn()// Cột tự động cập nhật khi update
    updateDate: Date;

    // Xóa mềm 
    @DeleteDateColumn()// Cột tự động cập nhật khi xóa
    dateledAt: Date;
}