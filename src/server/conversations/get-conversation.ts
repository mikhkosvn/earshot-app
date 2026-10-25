import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { getConversationSchema } from '@/server/conversations/schemas';
import type { ConversationDetail } from '@/server/conversations/types';
import {
  conversationDetailSelect,
  toConversationDetail,
} from '@/server/conversations/utils/conversation-detail';
import { sessionRecordingUrls } from '@/server/conversations/utils/recording-urls';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const getConversation = withValidation(
  getConversationSchema,
  async ({ conversationId }): Promise<ConversationDetail> => {
    const { user } = await requireUser();
    const row = await prisma.conversation.findUniqueOrThrow({
      where: { id: conversationId, project: projectAccessWhere(user.id) },
      select: conversationDetailSelect,
    });
    addEventFields({
      conversation: {
        id: conversationId,
        has_recording: row.recordingFileId !== null,
      },
      project: { id: row.projectId },
    });
    return toConversationDetail(row, sessionRecordingUrls(row.recordingFileId));
  },
);
