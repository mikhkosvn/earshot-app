import type { z } from 'zod';

import type { ShareLinkTarget } from '@/generated/prisma/enums';
import type {
  createShareLinkSchema,
  sharedConversationSchema,
  sharedRunSchema,
  sharedRunsSchema,
  shareLinkTokenSchema,
} from '@/server/share-links/schemas';

export type CreateShareLinkInput = z.input<typeof createShareLinkSchema>;
export type ShareLinkTokenInput = z.input<typeof shareLinkTokenSchema>;
export type SharedConversationInput = z.input<typeof sharedConversationSchema>;
export type SharedRunInput = z.input<typeof sharedRunSchema>;
export type SharedRunsInput = z.input<typeof sharedRunsSchema>;

export interface CreatedShareLink {
  token: string;
}

export interface SharedView {
  target: ShareLinkTarget;
  resultId: number | null;
  runId: number | null;
  callLogId: number | null;
  conversationId: number | null;
}
