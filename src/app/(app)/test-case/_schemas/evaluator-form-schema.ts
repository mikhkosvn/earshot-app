import type { z } from 'zod';

import { evaluatorFieldsSchema } from '@/server/evaluators/schemas/evaluator-fields';

import { requiredId } from './required-id';

export const evaluatorFormSchema = evaluatorFieldsSchema.extend({
  agentId: requiredId('Select an agent.'),
  personalityId: requiredId('Select a personality.'),
});

export type EvaluatorFormValues = z.input<typeof evaluatorFormSchema>;
export type EvaluatorFormOutput = z.output<typeof evaluatorFormSchema>;
