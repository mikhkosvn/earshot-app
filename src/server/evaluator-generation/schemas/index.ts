import { z } from 'zod';

import { ScenarioTool, ScenarioType } from '@/generated/prisma/enums';
import {
  AssistantMode,
  AssistantStatus,
  EXTRA_INSTRUCTIONS_MAX_LENGTH,
  GENERATION_MAX_SCENARIOS,
  GENERATION_MIN_SCENARIOS,
  GenerationScenarioType,
} from '@/server/evaluator-generation/constants';
import { folderPathSchema } from '@/server/folders/schemas';
import { tagListSchema } from '@/server/tags/schemas';

const projectId = z.number().int().positive();
const sessionId = z.number().int().positive();

export const generationOptionsSchema = z.object({
  agentId: z
    .number({ error: 'Select an agent.' })
    .int()
    .positive('Select an agent.'),
  folderPath: folderPathSchema,
  numScenarios: z
    .number({ error: 'Enter the number of scenarios.' })
    .int('Enter a whole number.')
    .min(
      GENERATION_MIN_SCENARIOS,
      `Generate at least ${GENERATION_MIN_SCENARIOS} scenario.`,
    )
    .max(
      GENERATION_MAX_SCENARIOS,
      `Generate at most ${GENERATION_MAX_SCENARIOS} scenarios at a time.`,
    ),
  scenarioType: z.enum(GenerationScenarioType),
  evaluatorFormat: z.enum(ScenarioType),
  extraInstructions: z
    .string()
    .trim()
    .max(
      EXTRA_INSTRUCTIONS_MAX_LENGTH,
      `Write ${EXTRA_INSTRUCTIONS_MAX_LENGTH} characters or fewer.`,
    ),
  tags: tagListSchema,
  testProfileId: z.number().int().positive().nullable(),
  phoneNumberId: z.number().int().positive().nullable(),
  personalityIds: z.array(z.number().int().positive()),
  firstMessage: z.string().nullable(),
  tools: z.array(z.enum(ScenarioTool)).nullable(),
});

export const startEvaluatorAssistantSchema = generationOptionsSchema.extend({
  projectId,
});

export const answerEvaluatorAssistantSchema = z
  .object({
    sessionId,
    answer: z.string().trim(),
    skipped: z.boolean(),
  })
  .refine((value) => value.skipped || value.answer.length > 0, {
    error: 'Type an answer or skip the question.',
    path: ['answer'],
  });

export const generationSessionIdSchema = z.object({ sessionId });

export const listGenerationSessionsSchema = z.object({ projectId });

export const assistantJobInputSchema = z.object({ sessionId });

export const generationJobInputSchema = z.object({
  sessionId,
  instructions: z.array(z.string()),
});

export const clarificationQuestionSchema = z.object({
  question: z.string(),
});

export const assistantJobResultSchema = z.object({
  mode: z.enum(AssistantMode),
  status: z.enum(AssistantStatus),
  sessionId: z.number(),
  message: z.string(),
  clarificationQuestions: z.array(clarificationQuestionSchema),
  baseExtraInstructions: z.string().nullable(),
  extraInstructionsList: z.array(z.string()),
  generationJobId: z.string().nullable(),
  summary: z.string(),
  deepLink: z.string(),
});

export const generationJobResultSchema = z.object({
  agentId: z.number(),
  sessionId: z.number(),
  completedScenarios: z.number(),
  failedScenarios: z.number(),
  totalScenarios: z.number(),
  scenarioIds: z.array(z.number()),
  errors: z.array(z.string()),
  summary: z.string().optional(),
  deepLink: z.string().optional(),
});

export const sessionOptionsSchema = z
  .object({
    folderPath: z.string().catch(''),
    numScenarios: z.number().catch(GENERATION_MIN_SCENARIOS),
  })
  .catch({ folderPath: '', numScenarios: GENERATION_MIN_SCENARIOS });
