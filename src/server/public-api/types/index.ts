import type { ApiKeyAuth } from '@/server/api-keys/types';

export type DetailErrorBody = { detail: string; code?: string };

export type FieldErrorBody = Record<string, string[]>;

export type NonFieldErrorBody = { non_field_errors: string[] };

export type PublicApiErrorBody =
  DetailErrorBody | FieldErrorBody | NonFieldErrorBody;

export type PaginatedBody<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PageParams = {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
};

export type PublicApiContext<TParams> = {
  auth: ApiKeyAuth;
  params: TParams;
};
