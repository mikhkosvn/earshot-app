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

export async function getGenerationSessionAction(
  args: GenerationSessionIdInput,
): Promise<GenerationSessionView> {
  return getGenerationSession(args);
}

export async function listGenerationSessionsAction(
  args: ListGenerationSessionsInput,
): Promise<GenerationSessionSummary[]> {
  return listGenerationSessions(args);
}

export async function startEvaluatorAssistantAction(
  args: StartEvaluatorAssistantInput,
): Promise<ActionResult<StartedAssistant>> {
  return runAction(() => startEvaluatorAssistant(args));
}

export async function answerEvaluatorAssistantAction(
  args: AnswerEvaluatorAssistantInput,
): Promise<ActionResult<StartedAssistant>> {
  return runAction(() => answerEvaluatorAssistant(args));
}
