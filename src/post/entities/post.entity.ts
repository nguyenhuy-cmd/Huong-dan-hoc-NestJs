import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { postType } from "../enums/postType.enum";
import { postStatus } from "../enums/postStatus.enum";

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

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true // Được để trống
    })
    tags?: string[];

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true // Được để trống
    })
    metaOptions?: string[];

}
