'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type {
  FilterOption,
  RunsOverviewFilters,
} from '@/server/runs-overview/types';

import { matchesSearch } from '../../../_utils/matches-search';
import { FilterEmpty } from './filter-empty';

interface AgentPanelProps {
  draft: RunsOverviewFilters;
  search: string;
  options: readonly FilterOption[];
  onChange: (draft: RunsOverviewFilters) => void;
}

const valueOf = (agentId: number | null) => {
  if (agentId === null) return '';
  return String(agentId);
};

export function AgentPanel({
  draft,
  search,
  options,
  onChange,
}: AgentPanelProps) {
  const visible = options.filter((option) => matchesSearch(option, search));

  return (
    <>
      <FilterEmpty count={visible.length} />
      <RadioGroup
        value={valueOf(draft.agentId)}
        onValueChange={(value) =>
          onChange({ ...draft, agentId: Number(value) })
        }
        className="gap-3"
      >
        {visible.map((option) => {
          const id = `overview-agent-${option.id}`;
          return (
            <div key={option.id} className="flex items-center gap-2">
              <RadioGroupItem id={id} value={String(option.id)} />
              <Label htmlFor={id} className="text-sm font-normal">
                {option.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
}
