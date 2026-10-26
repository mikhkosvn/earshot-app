import 'server-only';

import path from 'node:path';

import { prisma } from '@/lib/prisma';
import {
  CALL_UPLOAD_CONTENT_TYPE,
  callUploadFormatOf,
} from '@/server/call-logs/constants/call-upload-format';
import { uploadCallLogsSchema } from '@/server/call-logs/schemas';
import { createCallRecord } from '@/server/call-logs/utils/create-call-record';
import { startCallProcessing } from '@/server/call-logs/utils/processing/start-call-processing';
import { requestOrigin } from '@/server/call-logs/utils/request-origin';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { deleteFile } from '@/server/files/delete-file';
import { saveFile } from '@/server/files/save-file';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const contentTypeOf = (file: File) => {
  const format = callUploadFormatOf(file.name);
  if (file.type) return file.type;
  if (format) return CALL_UPLOAD_CONTENT_TYPE[format];
  return 'application/octet-stream';
};

const callIdOf = (fileName: string, now: Date) =>
  `${path.parse(fileName).name}_${Math.floor(now.getTime() / 1000)}`;

const storeUpload = async (projectId: number, agentId: number, file: File) => {
  const now = new Date();
  const stored = await saveFile({
    projectId,
    fileName: file.name,
    contentType: contentTypeOf(file),
    data: new Uint8Array(await file.arrayBuffer()),
  });
  try {
    return await prisma.$transaction((tx) =>
      createCallRecord(tx, {
        projectId,
        agentId,
        externalCallId: callIdOf(file.name, now),
        customerNumber: null,
        startedAt: now,
        endedReason: null,
        recordingFileId: stored.id,
        metadata: {},
        dynamicVariables: {},
        turns: [],
      }),
    );
  } catch (error) {
    await deleteFile(stored.id);
    throw error;
  }
};

export const uploadCallLogs = withValidation(
  uploadCallLogsSchema,
  async ({ projectId, agentId, files }) => {
    await requireProjectAccess(projectId);
    await prisma.agent.findUniqueOrThrow({
      where: { id: agentId, projectId },
      select: { id: true },
    });
    const origin = await requestOrigin();
    const created = [];
    for (const file of files) {
      created.push(await storeUpload(projectId, agentId, file));
    }
    for (const callLog of created) {
      await startCallProcessing(projectId, {
        callLogId: callLog.id,
        recordingUrl: null,
        origin,
      });
    }
    addEventFields({
      project: { id: projectId },
      agent: { id: agentId },
      call_logs: { uploaded: created.length },
    });
    return { callLogIds: created.map((callLog) => callLog.id) };
  },
);
