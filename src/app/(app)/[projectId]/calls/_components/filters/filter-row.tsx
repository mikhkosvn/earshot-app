'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  FILTER_OPERATOR_LABEL,
  FilterOperator,
} from '@/server/call-logs/constants/call-filter';

import {
  FILTER_KIND_OPERATORS,
  FilterFieldKind,
  type FilterFieldOption,
} from '../../_constants/call-filter-fields';
import type { FilterDraft } from '../../_utils/filter-draft';
import { FilterSelect } from './filter-select';
import { FilterValueControl } from './filter-value-control';
import { MetadataKeyInput } from './metadata-key-input';

interface FilterRowProps {
  draft: FilterDraft;
  options: readonly FilterFieldOption[];
  onChange: (draft: FilterDraft) => void;
  onRemove: () => void;
}

const kindOf = (options: readonly FilterFieldOption[], field: string) =>
  options.find((option) => option.key === field)?.kind ?? FilterFieldKind.text;

export function FilterRow({
  draft,
  options,
  onChange,
  onRemove,
}: FilterRowProps) {
  const kind = kindOf(options, draft.field);
  const operators = FILTER_KIND_OPERATORS[kind];

  return (
    <div className="flex items-center gap-1.5">
      <FilterSelect
        label="Filter field"
        className="w-40"
        items={options.map((option) => ({
          value: option.key,
          label: option.label,
        }))}
        value={draft.field}
        onValueChange={(field) =>
          onChange({
            ...draft,
            field,
            op: FilterOperator.eq,
            value: '',
            metadataKey: '',
          })
        }
      />
      <MetadataKeyInput
        kind={kind}
        value={draft.metadataKey}
        onChange={(metadataKey) => onChange({ ...draft, metadataKey })}
      />
      <FilterSelect
        label="Filter operator"
        className="w-36"
        items={operators.map((op) => ({
          value: op,
          label: FILTER_OPERATOR_LABEL[op],
        }))}
        value={draft.op}
        onValueChange={(op) => {
          const next = operators.find((item) => item === op);
          if (!next) return;
          onChange({ ...draft, op: next });
        }}
      />
      <FilterValueControl
        kind={kind}
        draft={draft}
        onChange={(value) => onChange({ ...draft, value })}
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
