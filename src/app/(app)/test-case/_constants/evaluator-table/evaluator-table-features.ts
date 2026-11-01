import {
  type Row,
  rowExpandingFeature,
  rowSelectionFeature,
  type Table,
  tableFeatures,
} from '@tanstack/react-table';

import type { EvaluatorListRow } from '@/server/evaluators/types';

export const evaluatorTableFeatures = tableFeatures({
  rowSelectionFeature,
  rowExpandingFeature,
  columnMeta: {} as { headClassName?: string; cellClassName?: string },
});

export type EvaluatorTableFeatures = typeof evaluatorTableFeatures;

export type EvaluatorTableInstance = Table<
  EvaluatorTableFeatures,
  EvaluatorListRow
>;

export type EvaluatorTableRow = Row<EvaluatorTableFeatures, EvaluatorListRow>;
