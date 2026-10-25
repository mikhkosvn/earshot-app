'use client';

import { Badge } from '@/components/ui/badge';

import { useResultRunsQuery } from '../../../_hooks/runs/use-result-runs-query';

export function RunsCardTitle() {
  const { data } = useResultRunsQuery();

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-base font-semibold">Runs</h2>
      <Badge variant="outline" className="rounded-full text-xs">
        {data.count}
      </Badge>
    </div>
  );
}
