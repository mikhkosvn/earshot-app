import { z } from 'zod';

import {
  FEEDBACK_MAX_LENGTH,
  metricValueSchema,
} from '@/server/run-reviews/schemas';

const idSchema = z.number().int().positive();

export const labCorrectionSchema = z.object({
  metricId: idSchema,
  expectedValue: metricValueSchema,
  feedback: z.string().trim().max(FEEDBACK_MAX_LENGTH),
});

export const createLabTestSetSchema = z.object({
  projectId: idSchema,
  conversationId: idSchema,
  corrections: z.array(labCorrectionSchema),
});

export const addRunsToLabSchema = z.object({
  projectId: idSchema,
  runIds: z.array(idSchema).min(1, 'Select at least one run.'),
});
