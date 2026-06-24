import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { postType } from "../enums/postType.enum";
import { postStatus } from "../enums/postStatus.enum";

import { MetaOption } from "src/meta-options/entities/meta-options.entity";
import { User } from "src/users/entities/user.entity";
import { Tag } from "src/tags/entities/tag.entity";

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false // Không được để trống
    })
    title: string;

    @Column({
        type: 'enum',
        enum: postType,//enum là các giá trị được định nghĩa trước
        nullable: false, // Không được để trống
        default: postType.POST// Giá trị mặc định khi tạo mới post là post
    })
    postType: postType;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false, // Không được để trống
        unique: true // Không được trùng lặp nếu đã tồn tại
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: postStatus,
        nullable: false, // Không được để trống
        default: postStatus.DRAFT// Giá trị mặc định khi tạo mới post là draft
    })
    status: postStatus;

    @Column({
        type: 'text',
        nullable: true // Được để trống
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true // Được để trống
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true // Được để trống
    })
    featuredImageURL?: string;

    @Column({
        type: 'timestamp',// timestamp là kiểu dữ liệu lưu trữ ngày giờ
        nullable: true // Được để trống
    })
    publishOn?: Date;

    @OneToOne(() => MetaOption, (metaOption) => metaOption.post,{
        cascade: true, // cascade: true, Khi tạo post thì tạo luôn metaOption và chỉ sử dụng trong mối quan hệ 
        eager: true// Giúp rút ngắn code khi gọi dữ liệu lên
    }) // OneToOne là mối quan hệ 1-1
    @JoinColumn({name: 'metaOptionsId'}) // JoinColumn là cột nối giữa 2 bảng
    metaOptions?: MetaOption; // OneToOne: 1 post chỉ có 1 metaOption

    @ManyToOne(() => User, (user) => user.posts, {
        eager: true// Giúp rút ngắn code khi gọi dữ liệu lên
    }) // Nhiều post thuộc về 1 user
    author: User; // TypeORM tự tạo cột "authorId" trong DB

    @ManyToMany(()=> Tag)
    @JoinTable({
        
    })
    tags?: Tag[];

}
