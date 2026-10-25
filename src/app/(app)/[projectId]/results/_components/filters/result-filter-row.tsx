'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  findResultFilterField,
  ResultFilterFieldLabel,
  type ResultFilterDraft,
} from '../../_utils/results-list/filter-drafts';
import { ResultFilterSelect } from './result-filter-select';
import { ResultFilterValueSelect } from './result-filter-value-select';

const FIELD_ITEMS = Object.entries(ResultFilterFieldLabel).map(
  ([value, label]) => ({ value, label }),
);

type ResultFilterRowProps = {
  draft: ResultFilterDraft;
  onChange: (draft: ResultFilterDraft) => void;
  onRemove: () => void;
};

export function ResultFilterRow({
  draft,
  onChange,
  onRemove,
}: ResultFilterRowProps) {
  return (
    <div className="flex items-center gap-1.5">
      <ResultFilterSelect
        label="Filter field"
        className="w-36"
        items={FIELD_ITEMS}
        value={draft.field}
        onValueChange={(value) => {
          const field = findResultFilterField(value);
          if (!field) return;
          onChange({ ...draft, field, value: '' });
        }}
      />
      <ResultFilterValueSelect
        field={draft.field}
        value={draft.value}
        onValueChange={(value) => onChange({ ...draft, value })}
      />
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Remove filter"
        onClick={onRemove}
      >
        <XIcon />
      </Button>
    </div>
  );
}
