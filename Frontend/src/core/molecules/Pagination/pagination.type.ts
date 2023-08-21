export type PaginationProps = {
  totalPages: number;
  totalRecords?: number;
  setPageNumber: (pageNumber: number) => void;
  currentPage: number;
  searchText?: string;
  pageNumber: number;
};
