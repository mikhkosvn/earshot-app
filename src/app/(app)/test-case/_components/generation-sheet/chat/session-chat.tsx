'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { getGenerationStage } from '@/app/(app)/test-case/_utils/generation-stage';

import { ChatBottom } from '../bottom/chat-bottom';
import { ChatMessage } from './chat-message';
import { GeneratedScenariosAccordion } from './generated-scenarios-accordion';
import { GenerationProgressCard } from './generation-progress-card';
import { ScenarioCountChip } from './scenario-count-chip';

interface SessionChatProps {
  sessionId: number;
}

export function SessionChat({ sessionId }: SessionChatProps) {
  const { data: session } = useSuspenseQuery(
    EvaluatorService.getGenerationSessionQuery({ sessionId }),
  );
  const stage = getGenerationStage(session);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b px-3 py-2">
        <ScenarioCountChip session={session} stage={stage} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
        {session.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <GenerationProgressCard session={session} stage={stage} />
        <GeneratedScenariosAccordion evaluators={session.evaluators} />
      </div>
      <ChatBottom session={session} stage={stage} />
    </div>
  );
}
