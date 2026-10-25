'use client';

import { PlayIcon } from 'lucide-react';

import { IdChip } from '@/components/common/clipboard/id-chip';

import { useSharedRun } from '../../_hooks/use-shared-run';
import { dateTimeText } from '../../_utils/share-format';
import { ShareAgentChip } from '../share-agent-chip';
import { ShareChip } from '../share-chip';

type SharedRunHeaderProps = {
  runId: number;
};

export function SharedRunHeader({ runId }: SharedRunHeaderProps) {
  const run = useSharedRun(runId);

  return (
    <div className="flex flex-col gap-2 pr-8">
      <div className="flex items-center gap-2">
        <h2 className="truncate text-base font-semibold">
          {run.evaluator.name}
        </h2>
        <IdChip id={run.id} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <ShareAgentChip agent={run.agent} />
        <ShareChip icon={PlayIcon}>
          <span suppressHydrationWarning>
            Run started at - {dateTimeText(run.startedAt)}
          </span>
        </ShareChip>
      </div>
    </div>
  );
}
