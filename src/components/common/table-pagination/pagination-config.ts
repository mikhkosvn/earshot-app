export const DEFAULT_PAGE_SIZE = 30;

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];

export const DEFAULT_PAGE_PARAM_KEY = 'page';

const VISIBLE_PAGE_COUNT = 5;

export const getPageCount = (totalCount: number, pageSize: number) =>
  Math.max(1, Math.ceil(totalCount / pageSize));

export const getVisiblePages = (page: number, pageCount: number) => {
  const half = Math.floor(VISIBLE_PAGE_COUNT / 2);
  const start = Math.max(
    1,
    Math.min(page - half, pageCount - VISIBLE_PAGE_COUNT + 1),
  );
  const end = Math.min(pageCount, start + VISIBLE_PAGE_COUNT - 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const getRowRange = (
  page: number,
  pageSize: number,
  totalCount: number,
) => {
  if (totalCount === 0) return { from: 0, to: 0 };
  const from = (page - 1) * pageSize + 1;
  return { from, to: Math.min(page * pageSize, totalCount) };
};
