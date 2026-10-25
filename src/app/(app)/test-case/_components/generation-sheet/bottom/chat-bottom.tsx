'use client';

import { GenerationStage } from '@/app/(app)/test-case/_constants/generation-stage';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';

import { FailedNotice } from './failed-notice';
import { QuestionComposer } from './question-composer';
import { SaveScenariosFooter } from './save-scenarios-footer';
import { WaitingComposer } from './waiting-composer';

type ChatBottomProps = {
  session: GenerationSessionView;
  stage: GenerationStage;
};

export function ChatBottom({ session, stage }: ChatBottomProps) {
  if (stage === GenerationStage.question) {
    return <QuestionComposer session={session} />;
  }
  if (stage === GenerationStage.thinking) {
    return <WaitingComposer placeholder="Thinking, please wait..." />;
  }
  if (stage === GenerationStage.generating) {
    return (
      <WaitingComposer placeholder="Generating scenarios, please wait..." />
    );
  }
  if (stage === GenerationStage.done) {
    return <SaveScenariosFooter session={session} />;
  }
  if (stage === GenerationStage.failed) {
    return <FailedNotice session={session} />;
  }
  return null;
}
