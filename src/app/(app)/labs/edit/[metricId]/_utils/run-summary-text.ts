import { JobStatus } from '@/generated/prisma/enums';
import type { LabRunView } from '@/server/labs/types';

const rowWord = (count: number) => {
  if (count === 1) return 'row';
  return 'rows';
};

const changedText = (count: number) => {
  if (count === 0) return 'No row changed its actual value.';
  return `${count} ${rowWord(count)} changed the actual value.`;
};

export const runSummaryText = (run: LabRunView) => {
  if (run.status === JobStatus.failed) {
    return `The last run failed: ${run.error ?? 'unknown error'}`;
  }
  if (run.status !== JobStatus.completed) {
    return run.step ?? 'The run is starting...';
  }
  if (!run.score) return 'The last run finished.';
  return `Last run: ${run.score.matched}/${run.score.total} rows match the expected value. ${changedText(run.changedReviewIds.length)}`;
};
