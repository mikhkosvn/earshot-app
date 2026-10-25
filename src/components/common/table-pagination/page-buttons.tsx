'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { PaginationIconButton } from './pagination-icon-button';
import { getPageCount, getVisiblePages } from './pagination-config';
import { usePaginationParams } from './use-pagination-params';

interface PageButtonsProps {
  totalCount: number;
  pageParamKey: string;
}

export function PageButtons({ totalCount, pageParamKey }: PageButtonsProps) {
  const { page, pageSize, setPage } = usePaginationParams(pageParamKey);
  const pageCount = getPageCount(totalCount, pageSize);
  const isFirstPage = page <= 1;
  const isLastPage = page >= pageCount;

  return (
    <div className="flex items-center gap-1">
      <PaginationIconButton
        icon={ChevronsLeftIcon}
        label="Go to first page"
        disabled={isFirstPage}
        onClick={() => setPage(1)}
      />
      <PaginationIconButton
        icon={ChevronLeftIcon}
        label="Go to previous page"
        disabled={isFirstPage}
        onClick={() => setPage(page - 1)}
      />
      {getVisiblePages(page, pageCount).map((pageNumber) => (
        <Button
          key={pageNumber}
          type="button"
          variant="outline"
          size="unstyled"
          aria-label={`Go to page ${pageNumber}`}
          aria-current={pageNumber === page}
          data-current={pageNumber === page}
          className="size-6.5 rounded-md bg-background text-xs data-[current=true]:border-primary data-[current=true]:bg-primary data-[current=true]:text-primary-foreground"
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <PaginationIconButton
        icon={ChevronRightIcon}
        label="Go to next page"
        disabled={isLastPage}
        onClick={() => setPage(page + 1)}
      />
      <PaginationIconButton
        icon={ChevronsRightIcon}
        label="Go to last page"
        disabled={isLastPage}
        onClick={() => setPage(pageCount)}
      />
    </div>
  );
}
