export type ApiErrorItem = {
  code?: string;
  field?: string;
  message: string;
};

export type ApiPagination = {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
};

export type ApiMeta = Record<string, unknown> & {
  traceId?: string;
  timestamp?: string;
};

export type ApiResponse<TData> = {
  success: boolean;
  data: TData;
  pagination?: ApiPagination;
  meta: ApiMeta;
  errors: ApiErrorItem[];
};

export const createApiResponse = <TData>(data: TData, meta: ApiMeta = {}): ApiResponse<TData> => ({
  success: true,
  data,
  meta,
  errors: [],
});
