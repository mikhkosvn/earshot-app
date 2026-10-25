'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';

import { useEvaluatorId } from '../../_hooks/use-evaluator-id';
import { VersionRow } from './version-row';

export function ChangeHistoryCard() {
  const evaluatorId = useEvaluatorId();
  const { data: versions } = useSuspenseQuery(
    EvaluatorService.getVersionsQuery({ evaluatorId }),
  );

  return (
    <section className="flex flex-col rounded-xl border bg-background">
      <div className="flex items-center justify-between border-b px-3 py-2.5">
        <h2 className="text-sm font-semibold">Change History</h2>
        <span className="text-xs text-muted-foreground">
          {versions.length} records
        </span>
      </div>
      <ol className="flex max-h-96 flex-col divide-y overflow-y-auto">
        {versions.map((version) => (
          <VersionRow key={version.id} version={version} />
        ))}
      </ol>
    </section>
  );
}
