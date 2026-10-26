import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { RunStatusLabel } from '@/server/results/constants/run-status-labels';
import {
  RESULT_CSV_FILE_NAME,
  RESULT_EXPORT_ROW_MAX,
  ResultRunTypeLabel,
} from '@/server/results/constants/result-list';
import { exportResultsSchema } from '@/server/results/schemas';
import type { ResultListRow } from '@/server/results/types';
import { resultFilterWhere } from '@/server/results/utils/result-filter-where';
import {
  resultRowSelect,
  toResultListRow,
} from '@/server/results/utils/result-row';

const CSV_HEADER = [
  'ID',
  'Label',
  '# Evaluators',
  'Runs',
  'Completed Runs',
  'Agent',
  'Agent Version',
  'Type',
  'Status',
  'Score',
  'Created At',
];

const csvCell = (value: string | number | null) => {
  const text = String(value ?? '');
  if (!/[",\n\r]/.test(text)) return text;
  return `"${text.replaceAll('"', '""')}"`;
};

const scoreText = (successRate: number | null) => {
  if (successRate === null) return '';
  return `${Math.round(successRate)}%`;
};

const csvLine = (row: ResultListRow) =>
  [
    row.id,
    row.name,
    row.evaluatorCount,
    row.totalRuns,
    row.completedRuns,
    row.agent?.name ?? '',
    row.agent?.versionLabel ?? '',
    ResultRunTypeLabel[row.runType],
    RunStatusLabel[row.status],
    scoreText(row.successRate),
    row.createdAt.toISOString(),
  ]
    .map(csvCell)
    .join(',');

export const exportResults = withValidation(
  exportResultsSchema,
  async ({ projectId, filters }) => {
    await requireProjectAccess(projectId);
    const rows = await prisma.result.findMany({
      where: resultFilterWhere(projectId, filters),
      select: resultRowSelect,
      orderBy: [
        { createdAt: Prisma.SortOrder.desc },
        { id: Prisma.SortOrder.desc },
      ],
      take: RESULT_EXPORT_ROW_MAX,
    });
    const lines = rows.map(toResultListRow).map(csvLine);
    addEventFields({ export: { row_count: rows.length } });
    return {
      fileName: RESULT_CSV_FILE_NAME,
      content: [CSV_HEADER.join(','), ...lines].join('\n'),
    };
  },
);
