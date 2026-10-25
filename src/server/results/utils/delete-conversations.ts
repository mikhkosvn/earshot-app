import 'server-only';

import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/server/files/delete-file';

export const deleteConversations = async (conversationIds: number[]) => {
  if (conversationIds.length === 0) return;
  const conversations = await prisma.conversation.findMany({
    where: { id: { in: conversationIds } },
    select: { recordingFileId: true },
  });
  await prisma.conversation.deleteMany({
    where: { id: { in: conversationIds } },
  });
  for (const conversation of conversations) {
    if (!conversation.recordingFileId) continue;
    await deleteFile(conversation.recordingFileId).catch(() => undefined);
  }
};
