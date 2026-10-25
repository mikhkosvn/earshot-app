import { z } from 'zod';

import {
  EvaluationTrigger,
  MetricType,
  TriggerType,
} from '@/generated/prisma/enums';
import {
  FEEDBACK_MAX_LENGTH,
  metricValueSchema,
} from '@/server/run-reviews/schemas';

const idSchema = z.number().int().positive();

export const labProjectSchema = z.object({
  projectId: idSchema,
});

export const labMetricSchema = z.object({
  metricId: idSchema,
});

export const labDraftSchema = z.object({
  type: z.enum(MetricType),
  description: z.string(),
  customCode: z.string(),
  evaluationTrigger: z.enum(EvaluationTrigger),
  triggerType: z.enum(TriggerType),
  evaluationTriggerPrompt: z.string(),
  evaluationTriggerCustomCode: z.string(),
});

export const startLabRunSchema = z.object({
  metricId: idSchema,
  draft: labDraftSchema,
});

export const updateLabExpectedSchema = z.object({
  reviewId: idSchema,
  expectedValue: metricValueSchema,
});

export const updateLabFeedbackSchema = z.object({
  reviewId: idSchema,
  feedback: z
    .string()
    .trim()
    .max(
      FEEDBACK_MAX_LENGTH,
      `The notes must have ${FEEDBACK_MAX_LENGTH} or fewer characters.`,
    ),
});

export const labRunJobResultSchema = z.object({
  summary: z.string(),
  deepLink: z.string(),
  metricId: z.number(),
  matched: z.number(),
  total: z.number(),
  changedReviewIds: z.array(z.number()),
});

export const labRunScoreSchema = labRunJobResultSchema
  .pick({ matched: true, total: true })
  .nullable()
  .catch(null);

export const labRunChangedReviewIdsSchema = z
  .object({
    changedReviewIds: z
      .array(z.unknown())
      .transform((items) =>
        items.filter((item): item is number => typeof item === 'number'),
      )
      .catch([]),
  })
  .catch({ changedReviewIds: [] });

export const deleteLabTestSetsSchema = z.object({
  metricId: idSchema,
  testSetIds: z.array(idSchema).min(1, 'Select at least one row.'),
});
