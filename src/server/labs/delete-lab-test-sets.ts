import 'server-only';

import { prisma } from '@/lib/prisma';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { deleteFile } from '@/server/files/delete-file';
import { LabStep } from '@/server/labs/constants/lab-step';
import { deleteLabTestSetsSchema } from '@/server/labs/schemas';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

const removeRecordings = async (fileIds: string[]) => {
  for (const fileId of fileIds) {
    await deleteFile(fileId).catch((error: unknown) =>
      recordStepFailure(LabStep.recording_delete, error),
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
    const recordingFileIds = copies.flatMap((conversation) => {
      if (!conversation.recordingFileId) return [];
      return [conversation.recordingFileId];
    });
    addEventFields({
      metric: { id: metricId },
      lab_test_sets: {
        requested: testSetIds.length,
        deleted: testSets.length,
        copy_conversations_deleted: copies.length,
        recordings_deleted: recordingFileIds.length,
      },
    });
    await removeRecordings(recordingFileIds);
    return { count: testSets.length };
  },
);
