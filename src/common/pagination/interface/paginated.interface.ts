// Interface Generic dùng cho mọi loại dữ liệu phân trang (Post, User, Tag,...)
// T là kiểu dữ liệu động, ví dụ: Paginated<Post>, Paginated<User>
export interface Paginated<T>{
    data: T[];      // Mảng dữ liệu thực sự trả về (ví dụ: danh sách bài viết)
    meta: {
        itemsPerPage: Number;   // Số bản ghi mỗi trang (ví dụ: 10)
        totalItems: Number;     // Tổng số bản ghi trong database (ví dụ: 53)
        currentPage: Number;    // Trang hiện tại đang xem (ví dụ: 2)
        totalPages: Number;     // Tổng số trang = totalItems / itemsPerPage (ví dụ: 6)
    }, 
    links: {
        first: String;      // Link đến trang đầu tiên    → /post?page=1&limit=10
        last: String;       // Link đến trang cuối cùng   → /post?page=6&limit=10
        current: String;    // Link trang hiện tại        → /post?page=2&limit=10
        next: String;       // Link trang tiếp theo       → /post?page=3&limit=10
        previous: String;   // Link trang trước đó        → /post?page=1&limit=10
    }
}