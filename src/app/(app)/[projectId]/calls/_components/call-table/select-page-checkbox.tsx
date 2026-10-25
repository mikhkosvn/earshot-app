'use client';

import { Checkbox } from '@/components/ui/checkbox';

import { useCallListQuery } from '../../_hooks/call-list/use-call-list-query';

interface SelectPageCheckboxProps {
  selectedIds: readonly number[];
  onSelectedIdsChange: (ids: number[]) => void;
}

export function SelectPageCheckbox({
  selectedIds,
  onSelectedIdsChange,
}: SelectPageCheckboxProps) {
  const { data } = useCallListQuery();
  const pageIds = data.rows.map((call) => call.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

  return (
    <Checkbox
      aria-label="Select all calls on this page"
      checked={allSelected}
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
