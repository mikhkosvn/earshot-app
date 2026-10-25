import { z } from 'zod';

import { ScenarioTool } from '@/generated/prisma/enums';
import { EvaluatorExportFormat } from '@/server/evaluators/constants/evaluator-export';
import { MAX_SELECTED_EVALUATORS } from '@/server/evaluators/constants/evaluator-limits';
import {
  evaluatorIdSchema,
  maxDurationSchema,
  projectIdSchema,
} from '@/server/evaluators/schemas/evaluator-fields';
import { folderPathSchema } from '@/server/folders/schemas';
import { tagListSchema } from '@/server/tags/schemas';

const optionalId = z.number().int().positive().nullable();

export const evaluatorSelectionSchema = z.object({
  projectId: projectIdSchema,
  evaluatorIds: z
    .array(evaluatorIdSchema)
    .min(1, 'Select at least one evaluator.')
    .max(MAX_SELECTED_EVALUATORS),
});

export const addEvaluatorTagsSchema = evaluatorSelectionSchema.extend({
  tags: tagListSchema.min(1, 'Add at least one tag.'),
});

export const moveEvaluatorsSchema = evaluatorSelectionSchema.extend({
  folderPath: folderPathSchema,
});

export const duplicateEvaluatorsSchema = evaluatorSelectionSchema.extend({
  targetProjectId: projectIdSchema,
  agentId: optionalId,
  folderPath: folderPathSchema,
});

export const modifyEvaluatorsFieldsSchema = z.object({
  agentId: optionalId,
  testProfileId: optionalId,
  personalityId: optionalId,
  firstMessage: z.string(),
  sendEmptyFirstMessage: z.boolean(),
  maxDurationSeconds: maxDurationSchema,
  phoneNumberId: optionalId,
  addMetricIds: z.array(z.number().int().positive()),
  removeMetricIds: z.array(z.number().int().positive()),
  appendInstructions: z.string(),
  addTools: z.array(z.enum(ScenarioTool)),
  removeTools: z.array(z.enum(ScenarioTool)),
});

export const modifyEvaluatorsSchema = evaluatorSelectionSchema.extend(
  modifyEvaluatorsFieldsSchema.shape,
);

export const exportEvaluatorsSchema = evaluatorSelectionSchema.extend({
  format: z.enum(EvaluatorExportFormat),
});
