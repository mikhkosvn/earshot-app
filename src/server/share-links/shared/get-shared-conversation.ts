import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import type { ConversationDetail } from '@/server/conversations/types';
import {
  conversationDetailSelect,
  toConversationDetail,
} from '@/server/conversations/utils/conversation-detail';
import { shareRecordingUrls } from '@/server/conversations/utils/recording-urls';
import { sharedConversationSchema } from '@/server/share-links/schemas';
import {
  requireShareLink,
  shareAllowsConversation,
} from '@/server/share-links/utils/resolve-share-link';

export const getSharedConversation = withValidation(
  sharedConversationSchema,
  async ({ token, conversationId }): Promise<ConversationDetail> => {
    const link = await requireShareLink(token);
    if (!(await shareAllowsConversation(link, conversationId))) {
      throw new Error('The share link does not include this conversation.');
    }
    const row = await prisma.conversation.findUniqueOrThrow({
      where: { id: conversationId },
      select: conversationDetailSelect,
    });
    return toConversationDetail(
      row,
      shareRecordingUrls(token, row.recordingFileId),
    );
  },
);
