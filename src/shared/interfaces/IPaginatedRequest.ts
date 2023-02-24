import Domain from "@modules/models/Domain";

interface IPaginatedRequest<T extends Domain>  {
  page?: number;
  limit?: number;
  filters?: Partial<T>;
}

export { IPaginatedRequest};
