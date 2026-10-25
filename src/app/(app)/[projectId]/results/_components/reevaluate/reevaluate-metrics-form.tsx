'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

import { useReevaluateMetricsMutation } from '../../_hooks/mutations/runs/use-reevaluate-metrics-mutation';
import type { ReevaluateTarget } from '../../_utils/runs/reevaluate-targets';
import { toggledIds } from '../../_utils/runs/run-selection';
import { ReevaluateMetricList } from './reevaluate-metric-list';
import { ReevaluateMetricSearch } from './reevaluate-metric-search';
import { ReevaluateSelectAllButton } from './reevaluate-select-all-button';
import { ReevaluateSubmitButton } from './reevaluate-submit-button';

type ReevaluateMetricsFormProps = {
  targets: ReevaluateTarget[];
  onDone: () => void;
};

const countText = (count: number) => {
  if (count === 1) return '1 metric selected';
  return `${count} metrics selected`;
};

export function ReevaluateMetricsForm({
  targets,
  onDone,
}: ReevaluateMetricsFormProps) {
  const [search, setSearch] = useState('');
  const [metricIds, setMetricIds] = useState<number[]>([]);
  const reevaluate = useReevaluateMetricsMutation();

  return (
    <form
      className="flex min-h-0 flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        reevaluate.mutate(
          { targets, metricIds },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              onDone();
            },
          },
        );
      }}
    >
      <div className="flex items-center gap-2">
        <ReevaluateMetricSearch value={search} onChange={setSearch} />
        <ReevaluateSelectAllButton
          search={search}
          metricIds={metricIds}
          onMetricIdsChange={setMetricIds}
        />
      </div>
      <ReevaluateMetricList
        search={search}
        metricIds={metricIds}
        onToggle={(id, checked) =>
          setMetricIds((ids) => toggledIds(ids, id, checked))
        }
      />
      <p className="text-xs text-muted-foreground">
        {countText(metricIds.length)}
      </p>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Close
        </DialogClose>
        <ReevaluateSubmitButton count={metricIds.length} />
      </DialogFooter>
    </form>
  );
}
