import { z } from 'zod';

import { Language, ScenarioType } from '@/generated/prisma/enums';
import {
  EVALUATOR_NAME_MAX_LENGTH,
  MAX_DURATION_MAX_SECONDS,
  MAX_DURATION_MIN_SECONDS,
} from '@/server/evaluators/constants/evaluator-limits';
import { instructionsSchema } from '@/server/evaluators/schemas/evaluator-fields';
import { tagNameSchema } from '@/server/tags/schemas';

const REQUIRED_MESSAGE = 'This field is required.';

const recordIdSchema = z.number({ error: REQUIRED_MESSAGE }).int().positive();

const optionalTextSchema = z
  .string()
  .nullish()
  .transform((text) => text ?? '');

export const createPublicScenarioSchema = z.object({
  name: z
    .string({ error: REQUIRED_MESSAGE })
    .trim()
    .min(1, 'The name is required.')
    .max(
      EVALUATOR_NAME_MAX_LENGTH,
      `The name must be ${EVALUATOR_NAME_MAX_LENGTH} characters or fewer.`,
    ),
  personality: recordIdSchema,
  tags: z
    .array(tagNameSchema)
    .nullish()
    .transform((tags) => tags ?? []),
  tool_ids: z
    .array(z.string())
    .nullish()
    .transform((toolIds) => toolIds ?? []),
  metrics: z
    .array(z.number().int().positive())
    .nullish()
    .transform((metrics) => metrics ?? []),
  first_message: optionalTextSchema,
  instructions: instructionsSchema,
  simulation_description: optionalTextSchema,
  expected_outcome_prompt: optionalTextSchema,
  scenario_language: z.enum(Language).default(Language.en),
  scenario_type: z.enum(ScenarioType).default(ScenarioType.instruction),
  test_profile: z.number().int().positive().nullish(),
  folder_path: z
    .string({ error: REQUIRED_MESSAGE })
    .trim()
    .min(1, REQUIRED_MESSAGE),
  max_duration: z
    .number()
    .int('Enter a whole number of seconds.')
    .min(
      MAX_DURATION_MIN_SECONDS,
      `The duration must be ${MAX_DURATION_MIN_SECONDS} seconds or more.`,
    )
    .max(
      MAX_DURATION_MAX_SECONDS,
      `The duration must be ${MAX_DURATION_MAX_SECONDS} seconds or less.`,
    )
    .nullish(),
  project: z.number().int().positive().nullish(),
  agent: recordIdSchema,
});

export type CreatePublicScenarioBody = z.output<
  typeof createPublicScenarioSchema
>;

export const listPublicScenariosQuerySchema = z.object({
  folder_path: z.string().trim().min(1).optional(),
});
