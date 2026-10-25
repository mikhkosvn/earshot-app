import { z } from 'zod';

import { dynamicVariableValuesSchema } from '@/server/agents/schemas';

export const addVariablesFormSchema = z.object({
  variables: z.array(dynamicVariableValuesSchema).min(1),
});

export type AddVariablesFormValues = z.input<typeof addVariablesFormSchema>;
