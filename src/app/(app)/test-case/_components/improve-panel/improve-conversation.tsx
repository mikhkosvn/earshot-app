'use client';

import { useImprovementTurns } from '../../_hooks/improve/use-improvement-turns';
import { ImproveEmptyState } from './improve-empty-state';
import { ImproveTurn } from './improve-turn';

type ImproveConversationProps = {
  scope: number;
  onSend: (prompt: string) => void;
};

export function ImproveConversation({
  scope,
  onSend,
}: ImproveConversationProps) {
  const turns = useImprovementTurns();

  if (turns.length === 0) {
    return <ImproveEmptyState scope={scope} onSend={onSend} />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3">
      {turns.map((turn) => (
        <ImproveTurn key={turn.id} turn={turn} />
      ))}
    </div>
  );
}
