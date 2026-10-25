'use client';

import { PlayIcon } from 'lucide-react';

import { useResultDetail } from '../../_hooks/use-result-detail';
import { triggerTimeText } from '../../_utils/date-format';
import { HeaderChip } from './header-chip';

export function ResultTriggerTimeChip() {
  const result = useResultDetail();

  return (
    <HeaderChip>
      <PlayIcon className="text-muted-foreground" />
      <span>Result Trigger Time: {triggerTimeText(result.createdAt)}</span>
    </HeaderChip>
  );
}
