import type { ResultDetail } from '@/server/results/types';

type ResultCounts = ResultDetail['counts'];

const runNoun = (total: number) => {
  if (total === 1) return 'run';
  return 'runs';
};

export const runsPassedText = (counts: ResultCounts) =>
  `${counts.success} of ${counts.total} ${runNoun(counts.total)} passed`;

export const resultStatusText = (counts: ResultCounts) => {
  if (counts.inProgress > 0) return `${counts.inProgress} in progress`;
  if (counts.failed === 0) return 'No failures detected';
  return `${counts.failed} failed`;
};
