import { Paginated } from './interface/paginated.interface';// Import interface Paginated<T> dùng cho response phân trang
import { ObjectLiteral, Repository } from 'typeorm'; // Import type từ typeorm
import { PaginationQueryDto } from './dtos/pagination-query.dto'; // Import DTO phân trang chứa limit và page
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationService {
    constructor(
        @Inject(REQUEST)
        private readonly request: { protocol: string; headers: { host: string }; url: string }// Định nghĩa kiểu request inline
    ) { }

    // Hàm phân trang generic, T có thể là User, Post, Tag,...
    async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto, // Tham số phân trang (limit, page)
        repository: Repository<T>
    ): Promise<Paginated<T>> { // Repository của entity cần phân trang

        // Query database: skip = bỏ qua (trang-1)*limit bản ghi, take = lấy limit bản ghi
        let posts = await repository.find({
            skip: (paginationQuery.page! - 1) * paginationQuery.limit!,// Dấu ! xác nhận giá trị không phải undefined
            take: paginationQuery.limit!// Dấu ! xác nhận giá trị không phải undefined
        })

        // Tạo URL gốc từ protocol (http/https) và host (localhost:3000)
        const baseURL = this.request.protocol + '://' + this.request.headers.host + '/';
        const newUrl = new URL(this.request.url, baseURL);// Parse URL hiện tại thành đối tượng URL

        // Tính toán số trang
        const totalItems = await repository.count();// Tổng số bản ghi trong database
        const totalPage = Math.ceil(totalItems / paginationQuery.limit!);// Tổng số trang = tổng bản ghi / số bản ghi mỗi trang

        // Tính trang tiếp theo: nếu ở trang cuối thì giữ nguyên, nếu chưa thì +1
        const nextPage =
            paginationQuery.page! === totalPage
                ? paginationQuery.page!
                : paginationQuery.page! + 1;

        // Tính trang trước đó: nếu ở trang đầu thì giữ nguyên, nếu chưa thì -1
        const previousPage =
            paginationQuery.page! === 1
                ? paginationQuery.page!
                : paginationQuery.page! - 1;

        // Tạo response theo interface Paginated<T>
        const finalResponse: Paginated<T> = {
            data: posts,// Mảng dữ liệu trả về
            meta: {
                itemsPerPage: paginationQuery.limit!,// Số bản ghi mỗi trang
                totalItems: totalItems,// Tổng số bản ghi
                currentPage: paginationQuery.page!,// Trang hiện tại
                totalPages: totalPage// Tổng số trang
            },
            links: {
                first: `${baseURL}?limit=${paginationQuery.limit}&page=1`,// Link trang đầu tiên
                last: `${baseURL}?limit=${paginationQuery.limit}&page=${totalPage}`,// Link trang cuối cùng
                current: `${baseURL}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,// Link trang hiện tại
                next: `${baseURL}?limit=${paginationQuery.limit}&page=${nextPage}`,// Link trang tiếp theo
                previous: `${baseURL}?limit=${paginationQuery.limit}&page=${previousPage}`,// Link trang trước đó
            }
        }

        return finalResponse;// Trả về response phân trang thay vì mảng posts thô
    }
}
