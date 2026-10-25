import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';

const shareLinkSelect = {
  id: true,
  projectId: true,
  target: true,
  resultId: true,
  runId: true,
  callLogId: true,
  expiresAt: true,
  revokedAt: true,
  run: { select: { conversationId: true, resultId: true } },
  callLog: { select: { conversationId: true } },
} as const;

export const findShareLink = async (token: string) => {
  const link = await prisma.shareLink.findUnique({
    where: { token },
    select: shareLinkSelect,
  });
  if (!link) return null;
  addEventFields({
    share_link: { id: link.id, target: link.target },
    project: { id: link.projectId },
  });
  if (link.revokedAt) return null;
  if (link.expiresAt && link.expiresAt.getTime() < Date.now()) return null;
  return link;
};

export type ResolvedShareLink = NonNullable<
  Awaited<ReturnType<typeof findShareLink>>
>;

export const requireShareLink = async (token: string) => {
  const link = await findShareLink(token);
  if (!link) throw new Error('The share link is not valid.');
  return link;
};

export const shareAllowsRun = (
  link: ResolvedShareLink,
  run: { id: number; resultId: number },
) => {
  if (link.resultId !== null) return run.resultId === link.resultId;
  return link.runId === run.id;
};

export const shareAllowsConversation = async (
  link: ResolvedShareLink,
  conversationId: number,
) => {
  if (link.run?.conversationId === conversationId) return true;
  if (link.callLog?.conversationId === conversationId) return true;
  if (link.resultId === null) return false;
  const run = await prisma.run.findUnique({
    where: { conversationId },
    select: { resultId: true },
  });
  return run?.resultId === link.resultId;
};
