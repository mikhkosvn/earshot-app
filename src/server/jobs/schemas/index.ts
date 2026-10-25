import { z } from 'zod';

import { JobKind } from '@/generated/prisma/enums';

export const getJobSchema = z.object({
  jobId: z.uuid(),
});

export const listRecentJobsSchema = z.object({
  projectId: z.number().int().positive(),
  kinds: z.array(z.enum(JobKind)).optional(),
});

export const dismissJobSchema = z.object({
  jobId: z.uuid(),
});

export const dismissAllJobsSchema = z.object({
  projectId: z.number().int().positive(),
  kinds: z.array(z.enum(JobKind)).optional(),
});

export const jobResultSchema = z
  .object({
    summary: z.string().optional(),
    deepLink: z.string().optional(),
  })
  .catchall(z.json());
