'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type {
  FilterOption,
  RunsOverviewFilters,
} from '@/server/runs-overview/types';

import { matchesSearch } from '../../../_utils/matches-search';
import type { IdListKey } from '../../../_utils/toggle-ids';
import { toggledId } from '../../../_utils/toggle-ids';
import { FilterEmpty } from './filter-empty';

type CheckboxPanelProps = {
  draft: RunsOverviewFilters;
  search: string;
  options: FilterOption[];
  listKey: IdListKey;
  onChange: (draft: RunsOverviewFilters) => void;
};

export function CheckboxPanel({
  draft,
  search,
  options,
  listKey,
  onChange,
}: CheckboxPanelProps) {
  const visible = options.filter((option) => matchesSearch(option, search));
  const selected = draft[listKey];

  return (
    <div className="flex flex-col gap-3">
      <FilterEmpty count={visible.length} />
      {visible.map((option) => {
        const id = `overview-${listKey}-${option.id}`;
        return (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={selected.includes(option.id)}
              onCheckedChange={(checked) =>
                onChange({
                  ...draft,
                  [listKey]: toggledId(selected, option.id, checked === true),
                })
              }
            />
            <Label htmlFor={id} className="text-sm font-normal">
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
