import { z } from 'zod';

export const conversationIdSchema = z.number().int().positive();

export const getConversationSchema = z.object({
  conversationId: conversationIdSchema,
});
