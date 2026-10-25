import { GenerationStage } from '@/app/(app)/test-case/_constants/generation-stage';
import { JobStatus } from '@/generated/prisma/enums';
import { AssistantStatus } from '@/server/evaluator-generation/constants';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';

const isActive = (status: JobStatus) =>
  status === JobStatus.queued || status === JobStatus.running;

const generationStage = (
  job: NonNullable<GenerationSessionView['generationJob']>,
) => {
  if (isActive(job.status)) return GenerationStage.generating;
  if (job.status === JobStatus.failed) return GenerationStage.failed;
  return GenerationStage.done;
};

const assistantStage = (
  job: NonNullable<GenerationSessionView['assistantJob']>,
) => {
  if (isActive(job.status)) return GenerationStage.thinking;
  if (job.status === JobStatus.failed) return GenerationStage.failed;
  if (job.result?.status === AssistantStatus.needs_clarification) {
    return GenerationStage.question;
  }
  return GenerationStage.generating;
};

export const getGenerationStage = (session: GenerationSessionView) => {
  if (session.generationJob) return generationStage(session.generationJob);
  if (session.assistantJob) return assistantStage(session.assistantJob);
  return GenerationStage.idle;
};

export const getSessionError = (session: GenerationSessionView) =>
  session.generationJob?.error ??
  session.assistantJob?.error ??
  'The generation failed.';
