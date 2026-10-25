import { z } from 'zod';

const projectId = z.number().int().positive();
const testProfileId = z.number().int().positive();

export const TEST_PROFILE_NAME_MAX_LENGTH = 200;

export const testProfileVariableSchema = z.object({
  key: z.string().trim(),
  value: z.string(),
});

const variableListSchema = z
  .array(testProfileVariableSchema)
  .transform((variables) => variables.filter((variable) => variable.key))
  .refine(
    (variables) =>
      new Set(variables.map((variable) => variable.key)).size ===
      variables.length,
    'Each variable key must be unique.',
  );

export const testProfileFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .max(
      TEST_PROFILE_NAME_MAX_LENGTH,
      `The name must be ${TEST_PROFILE_NAME_MAX_LENGTH} characters or fewer.`,
    ),
  agentId: z
    .number({ error: 'Select an agent.' })
    .int()
    .positive('Select an agent.'),
  mainAgentVariables: variableListSchema,
  testingAgentVariables: variableListSchema,
});

export const createTestProfileSchema = testProfileFieldsSchema.extend({
  projectId,
});

export const updateTestProfileSchema = testProfileFieldsSchema.extend({
  testProfileId,
});

export const testProfileIdSchema = z.object({ testProfileId });

export const listTestProfilesSchema = z.object({
  projectId,
  agentId: z.number().int().positive().nullable(),
});
