import { z } from 'zod';

import { Timezone } from '@/generated/prisma/enums';

const idSchema = z.number().int().positive();

const secondsSchema = z
  .number({ error: 'Enter a number of seconds.' })
  .int('Enter a whole number of seconds.')
  .min(0, 'Enter 0 or a larger number.');

export const projectNameSchema = z
  .string()
  .trim()
  .min(1, 'Enter a project name.')
  .max(200, 'The project name must have 200 or fewer characters.');

export const projectIdSchema = z.object({
  projectId: idSchema,
});

export const listProjectsSchema = z.object({
  organizationId: idSchema,
});

export const createProjectSchema = z.object({
  organizationId: idSchema,
  name: projectNameSchema,
});

export const projectSettingsSchema = z.object({
  name: projectNameSchema,
  timezone: z.enum(Timezone),
  outboundTimeout: secondsSchema,
  maxCallDuration: secondsSchema,
  minCallDuration: secondsSchema,
  sampleRate: z
    .number({ error: 'Enter a percentage from 0 to 100.' })
    .min(0, 'Enter a percentage from 0 to 100.')
    .max(1, 'Enter a percentage from 0 to 100.'),
  endCallEnabled: z.boolean(),
  useProviderTranscript: z.boolean(),
  reconcileProviderTranscripts: z.boolean(),
  deepResearchEnabled: z.boolean(),
});

export const updateProjectSchema = projectSettingsSchema
  .partial()
  .extend({ projectId: idSchema });
