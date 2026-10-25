import type { ActionResult } from '@/lib/action-result';
import { reevaluateResultAction } from '@/server/runs/actions';
import type { StartedReevaluation } from '@/server/runs/types';

export interface ReevaluateTarget {
  resultId: number;
  runIds?: number[];
}

export const reevaluateTargets = async (
  targets: ReevaluateTarget[],
  metricIds: number[],
) => {
  const jobIds: string[] = [];
  for (const target of targets) {
    const result: ActionResult<StartedReevaluation> =
      await reevaluateResultAction({
        resultId: target.resultId,
        metricIds,
        runIds: target.runIds,
      });
    if (!result.ok) return result;
    jobIds.push(result.data.jobId);
  }
  return { ok: true as const, data: { jobIds } };
};
