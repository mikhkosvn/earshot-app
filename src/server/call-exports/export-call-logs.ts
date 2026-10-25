import 'server-only';

import { format } from 'date-fns';

import { Prisma } from '@/generated/prisma/client';
import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import {
  CALL_EXPORT_CONTENT_TYPE,
  CALL_EXPORT_DATE_FORMAT,
  CALL_EXPORT_FILE_PREFIX,
} from '@/server/call-exports/constants';
import { exportCallLogsSchema } from '@/server/call-exports/schemas';
import { buildCallLogsCsv } from '@/server/call-exports/utils/build-call-logs-csv';
import type { CallJobStarted } from '@/server/call-logs/types';
import { callLogListWhere } from '@/server/call-logs/utils/filters/call-log-list-where';
import { publicCallLogSelect } from '@/server/call-logs/utils/payload/public-call-log';
import { withValidation } from '@/server/common/run-action';
import { saveFile } from '@/server/files/save-file';
import { startJob } from '@/server/jobs/start-job';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const rowsText = (count: number) => {
  if (count === 1) return '1 row exported';
  return `${count} rows exported`;
};

export const exportCallLogs = withValidation(
  exportCallLogsSchema,
  async ({ numRecords, ...scope }): Promise<CallJobStarted> => {
    const { user } = await requireProjectAccess(scope.projectId);
    const where = await callLogListWhere(scope);
    return startJob({
      projectId: scope.projectId,
      userId: user.id,
      kind: JobKind.export,
      input: { numRecords },
      initialStep: 'Exporting call logs',
      run: async ({ setResult }) => {
        const [records, metrics] = await Promise.all([
          prisma.callLog.findMany({
            where,
            orderBy: [
              { createdAt: Prisma.SortOrder.desc },
              { id: Prisma.SortOrder.desc },
            ],
            take: numRecords,
            select: publicCallLogSelect,
          }),
          prisma.metric.findMany({
            where: { projectId: scope.projectId, observabilityEnabled: true },
            orderBy: { name: Prisma.SortOrder.asc },
            select: { id: true, name: true },
          }),
        ]);
        const file = await saveFile({
          projectId: scope.projectId,
          fileName: `${CALL_EXPORT_FILE_PREFIX}${format(new Date(), CALL_EXPORT_DATE_FORMAT)}.csv`,
          contentType: CALL_EXPORT_CONTENT_TYPE,
          data: new TextEncoder().encode(buildCallLogsCsv(records, metrics)),
        });
        await setResult({
          summary: rowsText(records.length),
          deepLink: UrlGenerator.file({
            fileId: file.id,
            values: { download: 1 },
          }),
          fileId: file.id,
          recordsExported: records.length,
        });
      },
    });
  },
);
