'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Input } from '@/components/ui/input';
import { FilterOperator } from '@/server/call-logs/constants/call-filter';
import { CallEvaluationStatusLabel } from '@/server/results/constants/call-evaluation-status-labels';

import { FilterFieldKind } from '../../_constants/call-filter-fields';
import { CallService } from '../../_service';
import type { FilterDraft } from '../../_utils/filter-draft';
import { FilterSelect } from './filter-select';

interface FilterValueControlProps {
  kind: FilterFieldKind;
  draft: FilterDraft;
  onChange: (value: string) => void;
}

const STATUS_ITEMS = Object.entries(CallEvaluationStatusLabel).map(
  ([value, label]) => ({ value, label }),
);

export function FilterValueControl({
  kind,
  draft,
  onChange,
}: FilterValueControlProps) {
  const projectId = useCurrentProjectId();
  const { data: agents } = useSuspenseQuery({
    ...CallService.getAgentOptionsQuery({ projectId }),
    select: (items) =>
      items.map((agent) => ({ value: String(agent.id), label: agent.name })),
  });

  if (draft.op === FilterOperator.isnull) return <div className="flex-1" />;
  if (kind === FilterFieldKind.agent) {
    return (
      <FilterSelect
        label="Filter value"
        placeholder="Select agent"
        className="flex-1"
        items={agents}
        value={draft.value}
        onValueChange={onChange}
      />
    );
  }
  if (kind === FilterFieldKind.status) {
    return (
      <FilterSelect
        label="Filter value"
        placeholder="Select status"
        className="flex-1"
        items={STATUS_ITEMS}
        value={draft.value}
        onValueChange={onChange}
      />
    );
  }
  return (
    <Input
      value={draft.value}
      placeholder="Value"
      aria-label="Filter value"
      className="h-7 flex-1 text-xs md:text-xs"
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
