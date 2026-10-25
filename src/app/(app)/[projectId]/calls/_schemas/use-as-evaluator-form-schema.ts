import { z } from 'zod';

import { evaluatorsFromCallsSchema } from '@/server/call-logs/schemas';

export const useAsEvaluatorFormSchema = evaluatorsFromCallsSchema.extend({
  consent: z
    .boolean()
    .refine(Boolean, 'Confirm that you have the rights to use these calls.'),
});

export type UseAsEvaluatorFormValues = z.input<typeof useAsEvaluatorFormSchema>;
