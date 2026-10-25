import type { z } from 'zod';

import { generationOptionsSchema } from '@/server/evaluator-generation/schemas';

import { requiredId } from './required-id';

export const generateEvaluatorsFormSchema = generationOptionsSchema.extend({
  agentId: requiredId('Select an agent.'),
});

export type GenerateEvaluatorsFormValues = z.input<
  typeof generateEvaluatorsFormSchema
>;
export type GenerateEvaluatorsFormOutput = z.output<
  typeof generateEvaluatorsFormSchema
>;
