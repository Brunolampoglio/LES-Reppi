interface IPaginatedRequest<T> {
  page?: number;
  limit?: number;
  filters?: Partial<T>;
}

interface IPaginatedRequestObri<T>{
  page: number;
  limit: number;
  filters?: Partial<T>;

}

export { IPaginatedRequest, IPaginatedRequestObri };
