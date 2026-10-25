import { z } from 'zod';

import { alertParamsSchema, createAlertSchema } from '@/server/alerts/schemas';

export const editAlertFormSchema = z.object({
  name: createAlertSchema.shape.name.min(1, 'Enter a name for the alert.'),
  params: alertParamsSchema,
});

export type EditAlertFormValues = z.infer<typeof editAlertFormSchema>;
