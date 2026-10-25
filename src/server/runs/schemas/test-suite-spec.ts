import { z } from 'zod';

import { Language, ScenarioTool, ScenarioType } from '@/generated/prisma/enums';
import {
  MAX_DURATION_MAX_SECONDS,
  MAX_DURATION_MIN_SECONDS,
} from '@/server/evaluators/constants/evaluator-limits';
import {
  RUN_FREQUENCY_MAX,
  RUN_FREQUENCY_MIN,
} from '@/server/runs/constants/run-limits';
import { TEST_SUITE_SPEC_VERSION } from '@/server/evaluators/constants/evaluator-export';

const specIdSchema = z.number().int().positive();

const specFrequencySchema = z
  .number()
  .int('Enter a whole number.')
  .min(RUN_FREQUENCY_MIN, `Use ${RUN_FREQUENCY_MIN} or more.`)
  .max(RUN_FREQUENCY_MAX, `Use ${RUN_FREQUENCY_MAX} or less.`);

export const specScenarioSchema = z.object({
  key: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1, 'The name is required.'),
  type: z.enum(ScenarioType).default(ScenarioType.instruction),
  instructions: z.string().trim().min(1, 'The instructions are required.'),
  first_message: z.string().nullish(),
  expected_outcome: z.string().nullish(),
  tags: z.array(z.string().trim().min(1)).default([]),
  language: z.enum(Language).nullish(),
  max_duration: z
    .number()
    .int()
    .min(MAX_DURATION_MIN_SECONDS)
    .max(MAX_DURATION_MAX_SECONDS)
    .nullish(),
  personality: specIdSchema.nullish(),
  test_profile: specIdSchema.nullish(),
  tools: z.array(z.enum(ScenarioTool)).default([]),
  metrics: z
    .array(z.union([specIdSchema, z.string().trim().min(1)]))
    .default([]),
  frequency: specFrequencySchema.nullish(),
});

export const testSuiteSpecSchema = z.object({
  $schema: z.string().optional(),
  version: z.literal(TEST_SUITE_SPEC_VERSION, {
    error: `The version must be "${TEST_SUITE_SPEC_VERSION}".`,
  }),
  name: z.string().trim().nullish(),
  frequency: specFrequencySchema.nullish(),
  save_scenarios: z.boolean().default(false),
  folder: z.string().trim().min(1).nullish(),
  scenarios: z
    .array(specScenarioSchema)
    .min(1, 'The spec needs at least one scenario.'),
});

export type TestSuiteSpec = z.output<typeof testSuiteSpecSchema>;
export type SpecScenario = z.output<typeof specScenarioSchema>;
