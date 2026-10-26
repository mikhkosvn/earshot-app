import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  findShareLink,
  shareAllowsConversation,
} from '@/server/share-links/utils/resolve-share-link';

export const findSharedFile = async (token: string, fileId: string) => {
  const link = await findShareLink(token);
  if (!link) return null;
  const file = await prisma.storedFile.findUnique({
    where: { id: fileId },
    select: {
      id: true,
      projectId: true,
      storageKey: true,
      fileName: true,
      contentType: true,
      sizeBytes: true,
      conversations: { select: { id: true } },
    },
  });
  addEventFields({ file: { id: fileId, found: file !== null } });
  if (!file || file.projectId !== link.projectId) return null;
  for (const conversation of file.conversations) {
    if (await shareAllowsConversation(link, conversation.id)) return file;
  }
  return null;
};
