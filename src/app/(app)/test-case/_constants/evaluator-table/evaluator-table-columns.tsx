import { createColumnHelper } from '@tanstack/react-table';

import { LanguageLabel } from '@/server/agents/constants/language-labels';
import { EvaluatorSortField } from '@/server/evaluators/constants/evaluator-list';
import type { EvaluatorListRow } from '@/server/evaluators/types';

import { EvaluatorIdHead } from '../../_components/table/header/evaluator-id-head';
import { ExpandAllRowsButton } from '../../_components/table/header/expand-all-rows-button';
import { SortableHead } from '../../_components/table/header/sortable-head';
import { AgentChip } from '../../_components/table/row/agent-chip';
import { AuthorDate } from '../../_components/table/row/author-date';
import { EvaluatorRowActions } from '../../_components/table/row/evaluator-row-actions';
import { EvaluatorRowExpandButton } from '../../_components/table/row/evaluator-row-expand-button';
import { EvaluatorSelectCell } from '../../_components/table/row/evaluator-select-cell';
import { PhoneNumberCell } from '../../_components/table/row/phone-number-cell';
import { TagList } from '../../_components/table/row/tag-list';
import { EvaluatorTableColumn } from './evaluator-table-column';
import type { EvaluatorTableFeatures } from './evaluator-table-features';

const columnHelper = createColumnHelper<
  EvaluatorTableFeatures,
  EvaluatorListRow
>();

export const evaluatorTableColumns = columnHelper.columns([
  columnHelper.display({
    id: EvaluatorTableColumn.expand,
    header: ({ table }) => <ExpandAllRowsButton table={table} />,
    cell: ({ row }) => <EvaluatorRowExpandButton row={row} />,
    meta: { headClassName: 'w-8' },
  }),
  columnHelper.accessor('id', {
    header: ({ table }) => <EvaluatorIdHead table={table} />,
    cell: ({ row }) => <EvaluatorSelectCell row={row} />,
    meta: { headClassName: 'w-28' },
  }),
  columnHelper.accessor('name', {
    header: () => <SortableHead field={EvaluatorSortField.name} label="Name" />,
    meta: { cellClassName: 'max-w-56 truncate font-medium' },
  }),
  columnHelper.accessor((row) => row.personalityName ?? '-', {
    id: EvaluatorSortField.personality,
    header: () => (
      <SortableHead
        field={EvaluatorSortField.personality}
        label="Personality"
      />
    ),
    meta: { cellClassName: 'max-w-40 truncate' },
  }),
  columnHelper.accessor('agentName', {
    header: () => (
      <SortableHead field={EvaluatorSortField.agent} label="Agent" />
    ),
    cell: ({ row }) => (
      <AgentChip
        agentId={row.original.agentId}
        agentName={row.original.agentName}
      />
    ),
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone Number',
    cell: ({ row }) => (
      <PhoneNumberCell phoneNumber={row.original.phoneNumber} />
    ),
  }),
  columnHelper.accessor((row) => row.testProfileName ?? '--', {
    id: EvaluatorSortField.testProfile,
    header: () => (
      <SortableHead
        field={EvaluatorSortField.testProfile}
        label="Test Profile"
      />
    ),
    meta: { cellClassName: 'max-w-40 truncate' },
  }),
  columnHelper.accessor((row) => LanguageLabel[row.language], {
    id: EvaluatorSortField.language,
    header: () => (
      <SortableHead field={EvaluatorSortField.language} label="Language" />
    ),
  }),
  columnHelper.accessor('metricCount', {
    header: 'Metrics',
  }),
  columnHelper.accessor('tags', {
    header: 'Tags',
    cell: ({ row }) => <TagList tags={row.original.tags} />,
  }),
  columnHelper.accessor('createdAt', {
    header: () => (
      <SortableHead field={EvaluatorSortField.createdAt} label="Created At" />
    ),
    cell: ({ row }) => (
      <AuthorDate
        date={row.original.createdAt}
        author={row.original.createdByName}
      />
    ),
    meta: { cellClassName: 'whitespace-nowrap' },
  }),
  columnHelper.accessor('updatedAt', {
    header: () => (
      <SortableHead field={EvaluatorSortField.updatedAt} label="Updated At" />
    ),
    cell: ({ row }) => (
      <AuthorDate
        date={row.original.updatedAt}
        author={row.original.updatedByName}
      />
    ),
    meta: { cellClassName: 'whitespace-nowrap' },
  }),
  columnHelper.display({
    id: EvaluatorTableColumn.actions,
    header: 'Actions',
    cell: ({ row }) => <EvaluatorRowActions row={row.original} />,
    meta: { headClassName: 'text-right' },
  }),
]);
