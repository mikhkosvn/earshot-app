import type { RunRow } from '@/server/results/types';

export const toggledIds = (ids: number[], id: number, checked: boolean) => {
  if (checked) return [...new Set([...ids, id])];
  return ids.filter((item) => item !== id);
};

export const selectedEvaluatorIds = (rows: RunRow[], runIds: number[]) => [
  ...new Set(
    rows.flatMap((row) => {
      if (!runIds.includes(row.id) || row.evaluator.id === null) return [];
      return [row.evaluator.id];
    }),
  ),
];
