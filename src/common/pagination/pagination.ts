import { PaginationDto } from './dto/pagination.dto';

export function pagination<T>(
  page: number,
  size: number,
  data: T[],
  total: number
): PaginationDto<T> {
  const currentPage = page;
  const lastPage = Math.ceil(total / size);
  const hasNextPage = currentPage < lastPage;
  const hasPrevPage = currentPage > 1;
  const totalPages = lastPage;
  const pageSize = size;
  return {
    data,
    paginationData: {
      total,
      currentPage,
      lastPage,
      pageSize,
      totalPages,
      hasNextPage,
      hasPrevPage,
    },
  };
}
