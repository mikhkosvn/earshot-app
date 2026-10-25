'use client';

import { RelativeTime } from '@/components/common/relative-time';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { GenerationSessionSummary } from '@/server/evaluator-generation/types';

type HistoryRowProps = {
  session: GenerationSessionSummary;
  onOpen: () => void;
};

export function HistoryRow({ session, onOpen }: HistoryRowProps) {
  return (
    <li>
      <Button
        type="button"
        variant="ghost"
        className="h-auto w-full flex-col items-start gap-1 rounded-none px-3 py-2.5 text-left font-normal whitespace-normal"
        onClick={onOpen}
      >
        <span className="text-sm font-medium">{session.title}</span>
        <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{session.agentName ?? 'No agent'}</span>
          <Badge variant="outline">{session.evaluatorCount} scenario(s)</Badge>
          <RelativeTime date={session.createdAt} />
        </span>
      </Button>
    </li>
  );
}
