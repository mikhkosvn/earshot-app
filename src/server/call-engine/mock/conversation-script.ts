import { z } from 'zod';

import { TranscriptRole } from '@/server/call-engine/constants';

export const conversationScriptSchema = z.object({
  turns: z
    .array(
      z.object({
        role: z.enum(TranscriptRole),
        content: z.string(),
      }),
    )
    .min(2),
  endedBy: z.enum(TranscriptRole),
});

export type ConversationScript = z.infer<typeof conversationScriptSchema>;
