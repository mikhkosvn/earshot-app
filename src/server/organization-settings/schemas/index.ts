import { z } from 'zod';

import { TeamSize } from '@/generated/prisma/enums';

export const organizationIdSchema = z.object({
  organizationId: z.number().int().positive(),
});

export const organizationSettingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter an organization name.')
    .max(255, 'The organization name must have 255 or fewer characters.'),
  teamSize: z.enum(TeamSize).nullable(),
  maxConcurrentRuns: z
    .number({ error: 'Enter a number of calls.' })
    .int('Enter a whole number of calls.')
    .min(1, 'Enter 1 or a larger number.')
    .max(1000, 'Enter 1000 or a smaller number.'),
  allowDuplicateCallIds: z.boolean(),
  restrictNumbersToOwnImports: z.boolean(),
});

export const updateOrganizationSettingsSchema = organizationSettingsSchema
  .partial()
  .extend(organizationIdSchema.shape);
