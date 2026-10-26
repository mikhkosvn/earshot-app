'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { answerEvaluatorAssistant } from '@/server/evaluator-generation/answer-evaluator-assistant';
import { getGenerationSession } from '@/server/evaluator-generation/get-generation-session';
import { listGenerationSessions } from '@/server/evaluator-generation/list-generation-sessions';
import { startEvaluatorAssistant } from '@/server/evaluator-generation/start-evaluator-assistant';
import type {
  AnswerEvaluatorAssistantInput,
  GenerationSessionIdInput,
  GenerationSessionSummary,
  GenerationSessionView,
  ListGenerationSessionsInput,
  StartedAssistant,
  StartEvaluatorAssistantInput,
} from '@/server/evaluator-generation/types';
import { EvaluatorGenerationActionOperation } from '@/server/evaluator-generation/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getGenerationSessionAction(
  args: GenerationSessionIdInput,
): Promise<GenerationSessionView> {
  return withActionEvent(
    EvaluatorGenerationActionOperation.getGenerationSession,
    () => getGenerationSession(args),
  );
}

export async function listGenerationSessionsAction(
  args: ListGenerationSessionsInput,
): Promise<GenerationSessionSummary[]> {
  return withActionEvent(
    EvaluatorGenerationActionOperation.listGenerationSessions,
    () => listGenerationSessions(args),
  );
}

export async function startEvaluatorAssistantAction(
  args: StartEvaluatorAssistantInput,
): Promise<ActionResult<StartedAssistant>> {
  return withActionEvent(
    EvaluatorGenerationActionOperation.startEvaluatorAssistant,
    () => runAction(() => startEvaluatorAssistant(args)),
  );
}

export async function answerEvaluatorAssistantAction(
  args: AnswerEvaluatorAssistantInput,
): Promise<ActionResult<StartedAssistant>> {
  return withActionEvent(
    EvaluatorGenerationActionOperation.answerEvaluatorAssistant,
    () => runAction(() => answerEvaluatorAssistant(args)),
  );
}
