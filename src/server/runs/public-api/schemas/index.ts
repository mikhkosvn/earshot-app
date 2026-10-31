import { z } from 'zod';

import { CallerNumberMode, ScenarioType } from '@/generated/prisma/enums';
import {
  MAX_BULK_RUN_IDS,
  MAX_RECORD_ID,
  REQUIRED_FIELD_MESSAGE,
  RUN_IDS_FORMAT_MESSAGE,
  RUN_IDS_LIMIT_MESSAGE,
} from '@/server/runs/public-api/constants';
import { RunMessage } from '@/server/runs/constants/run-messages';
import {
  callsPerSecondSchema,
  concurrencyLimitSchema,
  frequencySchema,
  runNameSchema,
} from '@/server/runs/schemas';

const RUN_ID_PATTERN = /^[1-9]\d*$/;

const idSchema = z.number().int().positive();

const isRunIdText = (part: string) =>
  RUN_ID_PATTERN.test(part) && Number(part) <= MAX_RECORD_ID;

export const runIdsQuerySchema = z.object({
  run_ids: z
    .string({ error: RUN_IDS_FORMAT_MESSAGE })
    .transform((value) => value.split(',').map((part) => part.trim()))
    .refine((parts) => parts.every(isRunIdText), RUN_IDS_FORMAT_MESSAGE)
    .transform((parts) => [...new Set(parts.map(Number))])
    .refine((ids) => ids.length <= MAX_BULK_RUN_IDS, RUN_IDS_LIMIT_MESSAGE),
});

export const runPublicScenariosSchema = z.object({
  agent_id: z.number({ error: REQUIRED_FIELD_MESSAGE }).int().positive(),
  scenarios: z
    .array(idSchema, { error: REQUIRED_FIELD_MESSAGE })
    .min(1, RunMessage.noEvaluators),
  frequency: frequencySchema.nullish(),
  name: runNameSchema.nullish(),
  mock_tool_names: z.array(z.string()).nullish(),
  personality_ids: z.array(idSchema).nullish(),
  test_profile_ids: z.array(idSchema).nullish(),
  concurrency_limit: concurrencyLimitSchema.optional(),
  calls_per_second: callsPerSecondSchema.optional(),
  agent_number: z.string().nullish(),
  mode: z.enum(CallerNumberMode).nullish(),
  project_id: idSchema.nullish(),
});

export const storedScenarioTypeSchema = z
  .object({ scenarioType: z.enum(ScenarioType).nullable().catch(null) })
  .catch({ scenarioType: null });
