import { Post } from "src/post/entities/post.entity"; // ✅ Import từ src, không phải dist
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('meta_options')
export class MetaOption {
    @PrimaryGeneratedColumn()// PrimaryGeneratedColumn() là khóa chính tự động tăng
    id: number;

    
    @Column({
        type: 'jsonb', //jsonb là kiểu dữ liệu lưu trữ dữ liệu dạng JSON
        nullable: false // Không được để trống
    })
    metaValue: string;


    @CreateDateColumn()// Cột tự động tạo khi tạo    
    createdAt: Date;

    @UpdateDateColumn()// Cột tự động cập nhật khi update
    updateAt: Date;

    
    @OneToOne(() => Post, (post) => post.metaOptions,{
        onDelete: 'CASCADE',// Nếu có post bị xóa thì metaOption cũng bị xóa theo
    })
    post: Post

}