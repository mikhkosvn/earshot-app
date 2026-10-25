import { z } from 'zod';

import { ShareLinkTarget } from '@/generated/prisma/enums';
import { RESULT_PAGE_SIZE_MAX } from '@/server/results/constants/result-list';

const idSchema = z.number().int().positive();

export const shareTokenSchema = z.string().min(16).max(128);

export const createShareLinkSchema = z.object({
  projectId: idSchema,
  target: z.enum(ShareLinkTarget),
  targetId: idSchema,
});

export const shareLinkTokenSchema = z.object({
  token: shareTokenSchema,
});

export const sharedConversationSchema = z.object({
  token: shareTokenSchema,
  conversationId: idSchema,
});

export const sharedRunSchema = z.object({
  token: shareTokenSchema,
  runId: idSchema,
});

export const sharedRunsSchema = z.object({
  token: shareTokenSchema,
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(RESULT_PAGE_SIZE_MAX),
});
