import { z } from 'zod';

import { CallEvaluationStatus } from '@/generated/prisma/enums';

const idSchema = z.number().int().positive();

export const FEEDBACK_MAX_LENGTH = 5000;

export const metricValueSchema = z.union([
  z.boolean(),
  z.number(),
  z.string(),
  z.null(),
]);

export const updateRunEvaluationSchema = z.object({
  runId: idSchema,
  evaluationStatus: z.enum(CallEvaluationStatus),
});

export const updateRunFeedbackSchema = z.object({
  runId: idSchema,
  feedback: z
    .string()
    .trim()
    .max(
      FEEDBACK_MAX_LENGTH,
      `The feedback must have ${FEEDBACK_MAX_LENGTH} or fewer characters.`,
    ),
});

export const voteMetricSchema = z.object({
  conversationId: idSchema,
  metricId: idSchema,
  thumbsUp: z.boolean(),
  expectedValue: metricValueSchema,
  feedback: z.string().trim().max(FEEDBACK_MAX_LENGTH),
});
