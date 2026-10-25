import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { getJobSchema } from '@/server/jobs/schemas';
import { jobAccessWhere } from '@/server/jobs/utils/job-access-where';
import { jobViewSelect, toJobView } from '@/server/jobs/utils/job-view';

export const getJob = withValidation(getJobSchema, async ({ jobId }) => {
  const { user } = await requireUser();
  const row = await prisma.backgroundJob.findUniqueOrThrow({
    where: { id: jobId, ...jobAccessWhere(user.id) },
    select: jobViewSelect,
  });
  addEventFields({
    job: { id: row.id, kind: row.kind, status: row.status },
    project: { id: row.projectId },
  });
  return toJobView(row);
});
