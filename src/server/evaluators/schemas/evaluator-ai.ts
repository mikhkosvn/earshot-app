import { z } from 'zod';

import { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';
import {
  evaluatorIdSchema,
  projectIdSchema,
} from '@/server/evaluators/schemas/evaluator-fields';
import { evaluatorFilterSchema } from '@/server/evaluators/schemas/evaluator-list';
import { TranscriptRole } from '@/server/call-engine/constants';
import { folderPathSchema } from '@/server/folders/schemas';

export const improveEvaluatorTextSchema = z.object({
  projectId: projectIdSchema,
  agentId: z.number().int().positive().nullable(),
  kind: z.enum(EvaluatorTextKind),
  text: z.string().trim().min(1, 'Write some text first.'),
});

export const proposeEvaluatorImprovementsSchema = z.object({
  filter: evaluatorFilterSchema,
  limit: z.number().int().positive().max(50),
  prompt: z.string().trim().min(1, 'Describe how to improve the evaluators.'),
});

export const evaluatorImprovementChangeSchema = z.object({
  evaluatorId: evaluatorIdSchema,
  kind: z.enum(EvaluatorTextKind),
  value: z.string().trim().min(1),
});

export const applyEvaluatorImprovementsSchema = z.object({
  projectId: projectIdSchema,
  changes: z.array(evaluatorImprovementChangeSchema).min(1),
});

export const transcriptTurnSchema = z.object({
  role: z.enum(TranscriptRole),
  content: z.string(),
  startTime: z.number().nonnegative().nullable(),
});

export const createEvaluatorFromTranscriptSchema = z.object({
  projectId: projectIdSchema,
  agentId: z
    .number({ error: 'Select an agent.' })
    .int()
    .positive('Select an agent.'),
  folderPath: folderPathSchema,
  name: z.string().trim().max(200),
  turns: z
    .array(transcriptTurnSchema)
    .transform((turns) => turns.filter((turn) => turn.content.trim()))
    .refine((turns) => turns.length >= 2, 'Add at least two messages.'),
});
