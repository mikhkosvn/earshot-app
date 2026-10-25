import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { deleteFile } from '@/server/files/delete-file';
import { deleteLabTestSetsSchema } from '@/server/labs/schemas';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

const removeRecordings = async (fileIds: string[]) => {
  for (const fileId of fileIds) {
    await deleteFile(fileId).catch((error: unknown) =>
      console.error(`[labs] The recording ${fileId} was not deleted.`, error),
    );
  }
};

export const deleteLabTestSets = withValidation(
  deleteLabTestSetsSchema,
  async ({ metricId, testSetIds }) => {
    const { metric } = await requireMetricAccess(metricId);
    const testSets = await prisma.labTestSet.findMany({
      where: {
        id: { in: testSetIds },
        reviews: { some: { metricId } },
        conversation: { projectId: metric.projectId },
      },
      select: {
        id: true,
        conversation: {
          select: {
            id: true,
            recordingFileId: true,
            run: { select: { id: true } },
            callLog: { select: { id: true } },
          },
        },
      },
    });
    const copies = testSets
      .map((testSet) => testSet.conversation)
      .filter((conversation) => !conversation.run && !conversation.callLog);
    await prisma.$transaction([
      prisma.labTestSet.deleteMany({
        where: { id: { in: testSets.map((testSet) => testSet.id) } },
      }),
      prisma.conversation.deleteMany({
        where: { id: { in: copies.map((conversation) => conversation.id) } },
      }),
    ]);
    await removeRecordings(
      copies.flatMap((conversation) => {
        if (!conversation.recordingFileId) return [];
        return [conversation.recordingFileId];
      }),
    );
    return { count: testSets.length };
  },
);
