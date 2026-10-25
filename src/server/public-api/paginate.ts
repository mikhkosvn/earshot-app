import 'server-only';

import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '@/server/public-api/constants';
import type { PageParams, PaginatedBody } from '@/server/public-api/types';

const readPositiveInt = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  if (!value || !Number.isInteger(parsed) || parsed < 1) return fallback;
  return parsed;
};

export const readPageParams = (
  request: Request,
  defaultPageSize = DEFAULT_PAGE_SIZE,
): PageParams => {
  const { searchParams } = new URL(request.url);
  const page = readPositiveInt(searchParams.get('page'), 1);
  const pageSize = Math.min(
    readPositiveInt(searchParams.get('page_size'), defaultPageSize),
    MAX_PAGE_SIZE,
  );
  return { page, pageSize, skip: (page - 1) * pageSize, take: pageSize };
};

const pageUrl = (request: Request, page: number) => {
  const url = new URL(request.url);
  url.searchParams.set('page', String(page));
  return url.toString();
};

const nextPageUrl = (
  request: Request,
  page: number,
  pageSize: number,
  count: number,
) => {
  if (page * pageSize >= count) return null;
  return pageUrl(request, page + 1);
};

const previousPageUrl = (request: Request, page: number) => {
  if (page <= 1) return null;
  return pageUrl(request, page - 1);
};

export const paginate = <T>({
  page,
  pageSize,
  count,
  results,
  request,
}: {
  page: number;
  pageSize: number;
  count: number;
  results: T[];
  request: Request;
}): PaginatedBody<T> => ({
  count,
  next: nextPageUrl(request, page, pageSize, count),
  previous: previousPageUrl(request, page),
  results,
});
