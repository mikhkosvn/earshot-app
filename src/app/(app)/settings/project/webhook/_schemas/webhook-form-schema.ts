import { z } from 'zod';

import { webhookSettingsSchema } from '@/server/project-webhooks/schemas';

export const webhookFormSchema = webhookSettingsSchema
  .extend({ redactSensitiveData: z.boolean() })
  .superRefine((values, context) => {
    if (!values.redactSensitiveData || values.redactionFields.length > 0) {
      return;
    }
    context.addIssue({
      code: 'custom',
      path: ['redactionFields'],
      message: 'Select at least one detail to redact.',
    });
  });

export type WebhookFormValues = z.input<typeof webhookFormSchema>;
