'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';

import { useEvaluatorId } from '../../_hooks/use-evaluator-id';
import { diffSnapshots } from '../../_utils/diff-snapshots';

interface VersionDiffProps {
  compared: { fromId: number; toId: number } | null;
}

export function VersionDiff({ compared }: VersionDiffProps) {
  const evaluatorId = useEvaluatorId();
  const { data: versions } = useSuspenseQuery(
    EvaluatorService.getVersionsQuery({ evaluatorId }),
  );

  if (!compared) {
    return (
      <p className="text-xs text-muted-foreground italic">
        Select two versions and click Compare.
      </p>
    );
  }
  const from = versions.find((version) => version.id === compared.fromId);
  const to = versions.find((version) => version.id === compared.toId);
  if (!from || !to) return null;
  const changes = diffSnapshots(from.snapshot, to.snapshot);

  if (changes.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        v{from.version} and v{to.version} are the same.
      </p>
    );
  }

  return (
    <ul aria-label="Changes" className="flex flex-col gap-2 text-xs">
      {changes.map((change) => (
        <li
          key={change.label}
          className="flex flex-col gap-1 rounded-md border p-2"
        >
          <span className="font-medium">{change.label}</span>
          <pre className="rounded-sm bg-red-50 p-1.5 whitespace-pre-wrap text-red-900 dark:bg-red-950 dark:text-red-200">
            {change.from}
          </pre>
          <pre className="rounded-sm bg-green-50 p-1.5 whitespace-pre-wrap text-green-900 dark:bg-green-950 dark:text-green-200">
            {change.to}
          </pre>
        </li>
      ))}
    </ul>
  );
}
