export interface ApiMeta {
  timestamp: string;
  version: string;
  traceId?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
  meta: ApiMeta;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: ApiMeta & {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
