import { IsDate, IsOptional } from "class-validator";
import { IntersectionType } from "@nestjs/mapped-types";// kiểu giao nhau
import { PaginationQueryDto } from "../../common/pagination/dtos/pagination-query.dto";

export class GetPostDto extends IntersectionType(PaginationQueryDto) {
    @IsDate()// là ngày
    @IsOptional()// Tùy chọn, có thể có hoặc không
    startDate?: Date;// Ngày bắt đầu

    @IsDate()// là ngày
    @IsOptional()// Tùy chọn, có thể có hoặc không
    endDate?: Date;// Ngày kết thúc
}
 