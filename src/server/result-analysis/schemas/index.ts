import { z } from 'zod';

import {
  MAX_FAILURE_REASONS,
  MAX_METRIC_SUMMARY_SENTENCES,
  MAX_NEXT_STEPS,
  MAX_WORKFLOW_PATHS,
} from '@/server/result-analysis/constants';

export const aiSummarySchema = z.object({
  whatHappened: z.string(),
  whyItHappened: z.string(),
  howToFix: z.string(),
});

export const failureReasonsSchema = z.object({
  issues: z
    .array(
      z.object({
        description: z.string(),
        runIds: z.array(z.number().int()),
      }),
    )
    .max(MAX_FAILURE_REASONS),
});

export const nextStepsSchema = z.object({
  steps: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .max(MAX_NEXT_STEPS),
});

export const workflowCoverageSchema = z.object({
  paths: z
    .array(z.object({ label: z.string(), covered: z.boolean() }))
    .max(MAX_WORKFLOW_PATHS),
});

export const metricSummariesSchema = z.object({
  metrics: z.array(
    z.object({
      metricId: z.number().int(),
      explanation: z.array(z.string()).max(MAX_METRIC_SUMMARY_SENTENCES),
    }),
  ),
});
