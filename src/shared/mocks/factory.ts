import type { ApiMeta, ApiPagination, ApiResponse } from "@/shared/types/api-response";

export const mockOk = <TData>(
  data: TData,
  options?: {
    meta?: ApiMeta;
    pagination?: ApiPagination;
  }
): ApiResponse<TData> => ({
  success: true,
  data,
  pagination: options?.pagination,
  meta: options?.meta ?? { source: "mock" },
  errors: [],
});
