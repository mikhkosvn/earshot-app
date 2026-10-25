import { z } from 'zod';

import { RunChannel } from '@/server/runs/constants/run-channel';
import {
  CALLS_PER_SECOND_MAX,
  CALLS_PER_SECOND_MIN,
  CONCURRENCY_LIMIT_MIN,
  RESULT_NAME_MAX_LENGTH,
  RUN_FREQUENCY_MAX,
  RUN_FREQUENCY_MIN,
  TEST_SUITE_SPEC_MAX_BYTES,
} from '@/server/runs/constants/run-limits';
import { RunMessage } from '@/server/runs/constants/run-messages';

const recordIdSchema = z.number().int().positive();
const projectIdSchema = recordIdSchema;

export const runNameSchema = z
  .string()
  .trim()
  .max(
    RESULT_NAME_MAX_LENGTH,
    `The label must be ${RESULT_NAME_MAX_LENGTH} characters or fewer.`,
  );

export const frequencySchema = z
  .number({ error: 'Enter the number of times to run.' })
  .int('Enter a whole number.')
  .min(RUN_FREQUENCY_MIN, `Enter ${RUN_FREQUENCY_MIN} or more.`)
  .max(RUN_FREQUENCY_MAX, `Enter ${RUN_FREQUENCY_MAX} or less.`);

export const concurrencyLimitSchema = z
  .number({ error: 'Enter a number.' })
  .int('Enter a whole number.')
  .min(CONCURRENCY_LIMIT_MIN, `Enter ${CONCURRENCY_LIMIT_MIN} or more.`)
  .nullable();

export const callsPerSecondSchema = z
  .number({ error: 'Enter a number.' })
  .min(CALLS_PER_SECOND_MIN, `Enter ${CALLS_PER_SECOND_MIN} or more.`)
  .max(CALLS_PER_SECOND_MAX, `Enter ${CALLS_PER_SECOND_MAX} or less.`)
  .nullable();

export const runSettingsSchema = z.object({
  agentId: z
    .number({ error: 'Select an agent.' })
    .int()
    .positive('Select an agent.'),
  name: runNameSchema,
  frequency: frequencySchema,
  agentNumber: z.string().trim(),
  mockToolIds: z.array(recordIdSchema),
  randomize: z.boolean(),
  personalityIds: z.array(recordIdSchema),
  testProfileIds: z.array(recordIdSchema),
  concurrencyLimit: concurrencyLimitSchema,
  callsPerSecond: callsPerSecondSchema,
});

export const startRunSchema = runSettingsSchema.extend({
  projectId: projectIdSchema,
  evaluatorIds: z.array(recordIdSchema).min(1, RunMessage.noEvaluators),
});

export const testSuiteRequestSchema = z.object({
  projectId: projectIdSchema,
  agentId: z
    .number({ error: 'Select an agent.' })
    .int()
    .positive('Select an agent.'),
  channel: z.enum(RunChannel),
  specText: z
    .string()
    .trim()
    .min(1, 'Add a spec file.')
    .max(TEST_SUITE_SPEC_MAX_BYTES, 'The spec must be 1 MB or smaller.'),
});

export const resultIdSchema = z.object({ resultId: recordIdSchema });

export const reevaluateResultSchema = z.object({
  resultId: recordIdSchema,
  metricIds: z.array(recordIdSchema).min(1, 'Select a metric.').optional(),
  runIds: z.array(recordIdSchema).min(1).optional(),
});

export const reevaluateConversationsSchema = z.object({
  conversationIds: z
    .array(recordIdSchema)
    .min(1, 'Select at least one conversation.'),
  metricIds: z.array(recordIdSchema).min(1, 'Select a metric.').optional(),
});

export const runDefaultsSchema = z.object({
  projectId: projectIdSchema,
  evaluatorIds: z.array(recordIdSchema),
});

export const runAgentSchema = z.object({
  projectId: projectIdSchema,
  agentId: recordIdSchema,
  evaluatorIds: z.array(recordIdSchema),
});
