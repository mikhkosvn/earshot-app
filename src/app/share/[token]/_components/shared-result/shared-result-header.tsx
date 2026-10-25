'use client';

import { PlayIcon } from 'lucide-react';

import { useSharedResult } from '../../_hooks/use-shared-result';
import { dateTimeText } from '../../_utils/share-format';
import { ShareAgentChip } from '../share-agent-chip';
import { ShareChip } from '../share-chip';

export function SharedResultHeader() {
  const result = useSharedResult();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <h1 className="text-lg font-semibold">
        {result.name} ({result.id})
      </h1>
      <ShareAgentChip agent={result.agent} />
      <ShareChip icon={PlayIcon}>
        <span suppressHydrationWarning>
          Result Trigger Time: {dateTimeText(result.createdAt)}
        </span>
      </ShareChip>
    </div>
  );
}
