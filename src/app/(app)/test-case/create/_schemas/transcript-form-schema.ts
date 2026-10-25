import type { z } from 'zod';

import { requiredId } from '@/app/(app)/test-case/_schemas/required-id';
import { createEvaluatorFromTranscriptSchema } from '@/server/evaluators/schemas/evaluator-ai';

export const transcriptFormSchema = createEvaluatorFromTranscriptSchema
  .omit({ projectId: true })
  .extend({ agentId: requiredId('Select an agent.') });

export type TranscriptFormValues = z.input<typeof transcriptFormSchema>;
export type TranscriptFormOutput = z.output<typeof transcriptFormSchema>;
