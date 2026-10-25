'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { PAGE_SIZE_OPTIONS } from './pagination-config';
import { usePaginationParams } from './use-pagination-params';

type RowsPerPageSelectProps = {
  pageParamKey: string;
};

export function RowsPerPageSelect({ pageParamKey }: RowsPerPageSelectProps) {
  const { pageSize, setPageSize } = usePaginationParams(pageParamKey);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span>Rows per page:</span>
      <Select
        value={pageSize}
        onValueChange={(value) => {
          if (value === null) return;
          setPageSize(value);
        }}
      >
        <SelectTrigger
          size="sm"
          aria-label="Rows per page:"
          className="h-7 min-w-16 bg-background text-xs"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-16">
          {PAGE_SIZE_OPTIONS.map((size) => (
            <SelectItem key={size} value={size} className="text-xs">
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
