'use client';

import { Checkbox } from '@/components/ui/checkbox';

import { useResultListQuery } from '../../../_hooks/results-list/use-result-list-query';

interface SelectPageCheckboxProps {
  selectedIds: readonly number[];
  onSelectedIdsChange: (ids: number[]) => void;
}

export function SelectPageCheckbox({
  selectedIds,
  onSelectedIdsChange,
}: SelectPageCheckboxProps) {
  const { data } = useResultListQuery();
  const pageIds = data.rows.map((result) => result.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

  return (
    <Checkbox
      aria-label="Select all results on this page"
      checked={allSelected}
      disabled={pageIds.length === 0}
      onCheckedChange={(checked) => {
        if (checked) {
          onSelectedIdsChange([...new Set([...selectedIds, ...pageIds])]);
          return;
        }
        onSelectedIdsChange(selectedIds.filter((id) => !pageIds.includes(id)));
      }}
    />
  );
}
