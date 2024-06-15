export class PaginationDataDto {
  total!: number;
  currentPage!: number;
  lastPage!: number;
  pageSize!: number;
  totalPages!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
}

export class PaginationDto<T> {
  data!: T[];
  paginationData!: PaginationDataDto;
}
