import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { computeRubricVerdict } from '@/server/metric-scoring/compute-rubric-verdict';
import { runIdsQuerySchema } from '@/server/runs/public-api/schemas';
import { toPublicRun } from '@/server/runs/public-api/utils/public-run';
import { publicRunSelect } from '@/server/runs/public-api/utils/public-run-select';
import { runScopeWhere } from '@/server/runs/public-api/utils/run-scope-where';

type PublicRun = ReturnType<typeof toPublicRun>;

export const listPublicRunsBulk = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const { searchParams } = new URL(request.url);
  const { run_ids: runIds } = runIdsQuerySchema.parse({
    run_ids: searchParams.get('run_ids') ?? undefined,
  });
  const rows = await prisma.run.findMany({
    where: { id: { in: runIds }, ...runScopeWhere(auth) },
    select: publicRunSelect,
  });
  const byId = new Map<number, PublicRun>();
  for (const row of rows) {
    const rubric = await computeRubricVerdict({
      conversationId: row.conversationId,
    });
    byId.set(row.id, toPublicRun(row, rubric));
  }
  addEventFields({
    organization: { id: auth.organizationId },
    runs: { requested_count: runIds.length, returned: rows.length },
  });
  return runIds.flatMap((runId) => {
    const run = byId.get(runId);
    if (!run) return [];
    return [run];
  });
};
