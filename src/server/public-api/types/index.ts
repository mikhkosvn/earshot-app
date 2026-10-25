import type { ApiKeyAuth } from '@/server/api-keys/types';

export interface DetailErrorBody {
  detail: string;
  code?: string;
}

export type FieldErrorBody = Record<string, string[]>;

export interface NonFieldErrorBody {
  non_field_errors: string[];
}

export type PublicApiErrorBody =
  DetailErrorBody | FieldErrorBody | NonFieldErrorBody;

export interface PaginatedBody<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PageParams {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
}

export interface PublicApiContext<TParams> {
  auth: ApiKeyAuth;
  params: TParams;
}
