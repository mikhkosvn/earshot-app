'use client';

import { useState } from 'react';

import { IMPROVE_SCOPE_DEFAULT } from '@/server/evaluators/constants/evaluator-list';

import { useSendImprovement } from '../../_hooks/improve/use-send-improvement';
import { ImproveComposer } from './improve-composer';
import { ImproveConversation } from './improve-conversation';
import { ImprovePanelHeader } from './improve-panel-header';
import { ImproveScopeRow } from './improve-scope-row';

interface ImprovePanelProps {
  onClose: () => void;
}

export function ImprovePanel({ onClose }: ImprovePanelProps) {
  const [scope, setScope] = useState<number>(IMPROVE_SCOPE_DEFAULT);
  const { send, isPending } = useSendImprovement(scope);

  return (
    <aside
      aria-label="Improve Scenarios"
      className="flex w-105 shrink-0 flex-col border-l bg-background"
    >
      <ImprovePanelHeader scope={scope} onClose={onClose} />
      <ImproveScopeRow scope={scope} onScopeChange={setScope} />
      <ImproveConversation scope={scope} onSend={send} />
      <ImproveComposer onSend={send} isPending={isPending} />
    </aside>
  );
}
