import { z } from 'zod';

import { TEST_PROFILE_NAME_MAX_LENGTH } from '@/server/test-profiles/schemas';

const variableValueSchema = z
  .union([z.string(), z.number(), z.boolean()])
  .transform(String);

const variablesSchema = z
  .record(z.string(), variableValueSchema)
  .nullish()
  .transform((variables) => variables ?? {});

export const createPublicTestProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .max(
      TEST_PROFILE_NAME_MAX_LENGTH,
      `The name must be ${TEST_PROFILE_NAME_MAX_LENGTH} characters or fewer.`,
    )
    .nullish(),
  information: z
    .object({
      main_agent_variables: variablesSchema,
      testing_agent_variables: variablesSchema,
    })
    .nullish(),
  project: z.number().int().positive().nullish(),
  agent: z.number({ error: 'This field is required.' }).int().positive(),
});

export const listPublicTestProfilesQuerySchema = z.object({
  agent_id: z.coerce.number().int().positive().optional(),
  search: z.string().trim().optional(),
});
