import { z } from 'zod';

import { Language, ScenarioTool, ScenarioType } from '@/generated/prisma/enums';
import {
  EVALUATOR_NAME_MAX_LENGTH,
  MAX_DURATION_MAX_SECONDS,
  MAX_DURATION_MIN_SECONDS,
} from '@/server/evaluators/constants/evaluator-limits';
import { folderPathSchema } from '@/server/folders/schemas';
import { tagListSchema } from '@/server/tags/schemas';

export const projectIdSchema = z.number().int().positive();
export const evaluatorIdSchema = z.number().int().positive();

export const projectScopeSchema = z.object({ projectId: projectIdSchema });

export const agentScopeSchema = z.object({
  projectId: projectIdSchema,
  agentId: z.number().int().positive(),
});

const isJsonText = (text: string) => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

export const jsonTextSchema = z
  .string()
  .trim()
  .min(1, 'Enter a JSON value.')
  .refine(isJsonText, 'The value is not valid JSON.');

export const expectedToolCallSchema = z.object({
  mockToolId: z
    .number({ error: 'Select a mock tool.' })
    .int()
    .positive('Select a mock tool.'),
  input: jsonTextSchema,
  output: jsonTextSchema,
});

export const maxDurationSchema = z
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
  .nullable();

export const instructionsSchema = z
  .string()
  .trim()
  .min(1, 'The instructions are required.');

export const evaluatorFieldsSchema = z.object({
  agentId: z
    .number({ error: 'Select an agent.' })
    .int()
    .positive('Select an agent.'),
  name: z
    .string()
    .trim()
    .min(1, 'The name is required.')
    .max(
      EVALUATOR_NAME_MAX_LENGTH,
      `The name must be ${EVALUATOR_NAME_MAX_LENGTH} characters or fewer.`,
    ),
  folderPath: folderPathSchema,
  tags: tagListSchema,
  scenarioType: z.enum(ScenarioType),
  testProfileId: z.number().int().positive().nullable(),
  firstMessage: z.string(),
  instructions: instructionsSchema,
  personalityId: z
    .number({ error: 'Select a personality.' })
    .int()
    .positive('Select a personality.'),
  language: z.enum(Language),
  expectedOutcomePrompt: z.string(),
  metricIds: z.array(z.number().int().positive()),
  expectedToolCalls: z.array(expectedToolCallSchema),
  phoneNumberId: z.number().int().positive().nullable(),
  tools: z.array(z.enum(ScenarioTool)),
  maxDurationSeconds: maxDurationSchema,
});

export const createEvaluatorSchema = evaluatorFieldsSchema.extend({
  projectId: projectIdSchema,
});

export const updateEvaluatorSchema = evaluatorFieldsSchema.extend({
  evaluatorId: evaluatorIdSchema,
});

export const getEvaluatorSchema = z.object({ evaluatorId: evaluatorIdSchema });

export const restoreEvaluatorVersionSchema = z.object({
  evaluatorId: evaluatorIdSchema,
  versionId: z.number().int().positive(),
});

export const evaluatorExpectedToolCallViewSchema = z.object({
  mockToolId: z.number(),
  mockToolName: z.string(),
  input: z.string(),
  output: z.string(),
});

export const evaluatorSnapshotSchema = z.object({
  name: z.string(),
  agentId: z.number().nullable(),
  agentName: z.string().nullable(),
  folderPath: z.string().nullable(),
  tags: z.array(z.string()),
  scenarioType: z.enum(ScenarioType),
  testProfileId: z.number().nullable(),
  testProfileName: z.string().nullable(),
  firstMessage: z.string(),
  instructions: z.string(),
  personalityId: z.number().nullable(),
  personalityName: z.string().nullable(),
  language: z.enum(Language),
  expectedOutcomePrompt: z.string(),
  metricIds: z.array(z.number()),
  metricNames: z.array(z.string()),
  expectedToolCalls: z.array(evaluatorExpectedToolCallViewSchema),
  phoneNumberId: z.number().nullable(),
  phoneNumber: z.string().nullable(),
  tools: z.array(z.enum(ScenarioTool)),
  maxDurationSeconds: z.number().nullable(),
});
