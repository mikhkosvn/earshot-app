import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { listCallLogsSchema } from '@/server/call-logs/schemas';
import type { CallLogListPage } from '@/server/call-logs/types';
import {
  callLogRowSelect,
  toCallLogRow,
} from '@/server/call-logs/utils/call-log-row';
import { callLogListWhere } from '@/server/call-logs/utils/filters/call-log-list-where';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listCallLogs = withValidation(
  listCallLogsSchema,
  async ({ page, pageSize, ...scope }): Promise<CallLogListPage> => {
    await requireProjectAccess(scope.projectId);
    const where = await callLogListWhere(scope);
    const [count, rows] = await prisma.$transaction([
      prisma.callLog.count({ where }),
      prisma.callLog.findMany({
        where,
        orderBy: [
          { createdAt: Prisma.SortOrder.desc },
          { id: Prisma.SortOrder.desc },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: callLogRowSelect,
      }),
    ]);
    addEventFields({
      project: { id: scope.projectId },
      call_logs: { count, returned: rows.length, page, page_size: pageSize },
    });
    return { count, rows: rows.map(toCallLogRow) };
  },
);
