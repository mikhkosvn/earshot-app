'use client';

import { useResultFilterValueItems } from '../../_hooks/filters/use-result-filter-value-items';
import type { ResultFilterField } from '../../_utils/results-list/filter-drafts';
import { ResultFilterSelect } from './result-filter-select';

type ResultFilterValueSelectProps = {
  field: ResultFilterField;
  value: string;
  onValueChange: (value: string) => void;
};

export function ResultFilterValueSelect({
  field,
  value,
  onValueChange,
}: ResultFilterValueSelectProps) {
  const items = useResultFilterValueItems(field);

  return (
    <ResultFilterSelect
      label="Filter value"
      placeholder="Select value"
      className="flex-1"
      items={items}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
