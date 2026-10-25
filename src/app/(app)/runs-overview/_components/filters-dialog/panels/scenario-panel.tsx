'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type {
  FilterOption,
  RunsOverviewFilters,
} from '@/server/runs-overview/types';

import { matchesSearch } from '../../../_utils/matches-search';
import { toggledIds } from '../../../_utils/toggle-ids';
import { CheckboxPanel } from './checkbox-panel';

type ScenarioPanelProps = {
  draft: RunsOverviewFilters;
  search: string;
  options: FilterOption[];
  onChange: (draft: RunsOverviewFilters) => void;
};

const SELECT_ALL_ID = 'overview-scenarios-all';

export function ScenarioPanel({
  draft,
  search,
  options,
  onChange,
}: ScenarioPanelProps) {
  const visibleIds = options
    .filter((option) => matchesSearch(option, search))
    .map((option) => option.id);
  const allSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => draft.evaluatorIds.includes(id));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b pb-3">
        <Checkbox
          id={SELECT_ALL_ID}
          checked={allSelected}
          disabled={visibleIds.length === 0}
          onCheckedChange={(checked) =>
            onChange({
              ...draft,
              evaluatorIds: toggledIds(
                draft.evaluatorIds,
                visibleIds,
                checked === true,
              ),
            })
          }
        />
        <Label htmlFor={SELECT_ALL_ID} className="text-sm font-normal">
          Select all
        </Label>
      </div>
      <CheckboxPanel
        draft={draft}
        search={search}
        options={options}
        listKey="evaluatorIds"
        onChange={onChange}
      />
    </div>
  );
}
