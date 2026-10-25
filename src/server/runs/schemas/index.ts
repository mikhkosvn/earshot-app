import { z } from 'zod';

import { ScenarioType } from '@/generated/prisma/enums';
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

const agentIdSchema = z
  .number({ error: 'Select an agent.' })
  .int()
  .positive('Select an agent.');

export const runSettingsSchema = z.object({
  agentId: agentIdSchema,
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
  agentId: agentIdSchema,
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

export const evaluatorSnapshotSchema = z.object({
  id: z.number().nullable(),
  key: z.string().nullable(),
  name: z.string(),
  scenarioType: z.enum(ScenarioType),
  instructions: z.string(),
  expectedOutcomePrompt: z.string().nullable(),
  firstMessage: z.string().nullable(),
  language: z.string(),
  maxDurationSeconds: z.number().nullable(),
  tools: z.array(z.string()),
  tags: z.array(z.string()),
  metricIds: z.array(z.number()),
});

export const testProfileSnapshotSchema = z.object({
  id: z.number(),
  name: z.string(),
  mainAgentVariables: z.record(z.string(), z.string()),
  testingAgentVariables: z.record(z.string(), z.string()),
});

const storedObjectSchema = z.record(z.string(), z.unknown()).catch({});

const storedNumbersSchema = z
  .array(z.unknown())
  .transform((items) =>
    items.filter((item): item is number => typeof item === 'number'),
  )
  .catch([]);

export const evaluatorSnapshotReaderSchema = storedObjectSchema.pipe(
  z.object({
    name: evaluatorSnapshotSchema.shape.name.catch(''),
    instructions: evaluatorSnapshotSchema.shape.instructions.catch(''),
    expectedOutcomePrompt:
      evaluatorSnapshotSchema.shape.expectedOutcomePrompt.catch(null),
    firstMessage: evaluatorSnapshotSchema.shape.firstMessage.catch(null),
    maxDurationSeconds:
      evaluatorSnapshotSchema.shape.maxDurationSeconds.catch(null),
    metricIds: storedNumbersSchema,
  }),
);

const storedVariablesSchema = z.record(z.string(), z.coerce.string()).catch({});

export const testProfileVariablesReaderSchema = storedObjectSchema.pipe(
  z.object({
    mainAgentVariables: storedVariablesSchema,
    testingAgentVariables: storedVariablesSchema,
  }),
);
