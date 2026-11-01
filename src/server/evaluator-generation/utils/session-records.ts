import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { ChatRole, JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const sessionAccessWhere = (userId: number) =>
  ({
    project: projectAccessWhere(userId),
  }) satisfies Prisma.EvaluatorGenerationSessionWhereInput;

export const appendSessionMessage = async (
  tx: Prisma.TransactionClient,
  sessionId: number,
  role: ChatRole,
  content: string,
) => {
  const last = await tx.evaluatorGenerationMessage.findFirst({
    where: { sessionId },
    orderBy: { position: Prisma.SortOrder.desc },
    select: { position: true },
  });
  await tx.evaluatorGenerationMessage.create({
    data: { sessionId, role, content, position: (last?.position ?? -1) + 1 },
  });
};

export const latestSessionJob = (
  projectId: number,
  sessionId: number,
  kind: JobKind,
) =>
  prisma.backgroundJob.findFirst({
    where: {
      projectId,
      kind,
      input: { path: ['sessionId'], equals: sessionId },
    },
    orderBy: { createdAt: Prisma.SortOrder.desc },
    select: {
      id: true,
      status: true,
      currentStep: true,
      result: true,
      error: true,
    },
  });

interface SessionLinkArgs {
  projectId: number;
  folderPath: string;
  sessionId?: number;
  jobId?: string;
}

const sessionFolderId = async (projectId: number, folderPath: string) => {
  const folder = await prisma.folder.findUnique({
    where: { projectId_path: { projectId, path: folderPath } },
    select: { id: true },
  });
  return folder?.id ?? null;
};

export const sessionDeepLink = async ({
  projectId,
  folderPath,
  sessionId,
  jobId,
}: SessionLinkArgs) => {
  const values = {
    project: projectId,
    reopenSheet: true,
    sessionId: sessionId ?? null,
    progressId: jobId ?? null,
  };
  const folderId = await sessionFolderId(projectId, folderPath);
  if (folderId === null) return UrlGenerator.evaluators({ values });
  return UrlGenerator.evaluatorFolder({ folderId, values });
};
