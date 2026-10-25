'use client';

import { Checkbox } from '@/components/ui/checkbox';

import { useLab } from '../../_hooks/lab/use-lab';

type SelectAllRowsCheckboxProps = {
  selected: number[];
  onSelectedChange: (selected: number[]) => void;
};

export function SelectAllRowsCheckbox({
  selected,
  onSelectedChange,
}: SelectAllRowsCheckboxProps) {
  const { rows } = useLab();
  const ids = rows.map((row) => row.testSetId);
  const isAllSelected =
    ids.length > 0 && ids.every((id) => selected.includes(id));

  return (
    <Checkbox
      aria-label="Select all rows"
      checked={isAllSelected}
      disabled={ids.length === 0}
      onCheckedChange={(checked) => {
        if (checked) {
          onSelectedChange(ids);
          return;
        }
        onSelectedChange([]);
      }}
    />
  );
}
