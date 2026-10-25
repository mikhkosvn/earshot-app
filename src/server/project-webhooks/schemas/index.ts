import { z } from 'zod';

import { RedactionField, WebhookNotification } from '@/generated/prisma/enums';

const idSchema = z.number().int().positive();

export const webhookUrlSchema = z
  .string()
  .trim()
  .max(2000, 'The URL must have 2000 or fewer characters.')
  .refine((value) => value === '' || /^https?:\/\/\S+$/i.test(value), {
    message: 'Enter a URL that starts with http:// or https://.',
  });

export const webhookSettingsSchema = z.object({
  url: webhookUrlSchema,
  secret: z
    .string()
    .trim()
    .max(500, 'The secret must have 500 or fewer characters.'),
  notifications: z.array(z.enum(WebhookNotification)),
  redactionFields: z.array(z.enum(RedactionField)),
  skipCallsWithoutContent: z.boolean(),
  forwardVapiWebhooks: z.boolean(),
  forwardRetellWebhooks: z.boolean(),
});

export const projectWebhookIdSchema = z.object({
  projectId: idSchema,
});

export const saveProjectWebhookSchema = webhookSettingsSchema.extend({
  projectId: idSchema,
});

export const testProjectWebhookSchema = z.object({
  projectId: idSchema,
  notification: z.enum(WebhookNotification),
});
