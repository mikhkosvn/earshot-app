'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { JobService } from '@/components/common/background-tasks/_service';
import { Checkbox } from '@/components/ui/checkbox';

import { readGeneratedMetrics } from '../../_utils/generated-metrics';
import { selectionState } from '../../_utils/selection-state';
import { toggleItem } from '../../_utils/toggle-item';
import { GeneratedMetricCard } from './generated-metric-card';
import { SaveGeneratedMetricsButton } from './save-generated-metrics-button';

type GeneratedMetricsContentProps = {
  jobId: string;
  onSaved: () => void;
};

export function GeneratedMetricsContent({
  jobId,
  onSaved,
}: GeneratedMetricsContentProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const { data: job } = useSuspenseQuery(JobService.getJobQuery({ jobId }));
  const drafts = readGeneratedMetrics(job);
  const allIndexes = drafts.map((_, index) => index);
  const { checked, indeterminate } = selectionState(
    selected.length,
    drafts.length,
  );

  const handleSelectAll = (value: boolean) => {
    if (!value) {
      setSelected([]);
      return;
    }
    setSelected(allIndexes);
  };

  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex items-center justify-between border-b px-3 py-2.5 text-xs">
        <span>Select metrics to save:</span>
        <label className="flex cursor-pointer items-center gap-2">
          <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            disabled={drafts.length === 0}
            onCheckedChange={handleSelectAll}
          />
          Select All
        </label>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
        {drafts.map((draft, index) => (
          <GeneratedMetricCard
            key={draft.name}
            draft={draft}
            checked={selected.includes(index)}
            onCheckedChange={(value) =>
              setSelected(toggleItem(selected, index, value))
            }
          />
        ))}
      </div>
      <div className="px-3 pb-3">
        <SaveGeneratedMetricsButton
          jobId={jobId}
          drafts={drafts.filter((_, index) => selected.includes(index))}
          onSaved={onSaved}
        />
      </div>
    </div>
  );
}
