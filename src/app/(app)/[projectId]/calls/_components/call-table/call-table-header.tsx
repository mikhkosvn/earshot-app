'use client';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useMetricColumnsQuery } from '../../_hooks/call-list/use-metric-columns-query';
import { SelectPageCheckbox } from './select-page-checkbox';

const FIXED_COLUMNS = [
  'Call ID',
  'Call Started At',
  'Duration',
  'Agent',
  'Customer',
  'Ended Reason',
  'Evaluation',
  'Feedback',
];

type CallTableHeaderProps = {
  selectedIds: number[];
  onSelectedIdsChange: (ids: number[]) => void;
};

export function CallTableHeader({
  selectedIds,
  onSelectedIdsChange,
}: CallTableHeaderProps) {
  const { data: metrics } = useMetricColumnsQuery();

  return (
    <TableHeader>
      <TableRow className="bg-muted/50">
        <TableHead className="w-8" />
        <TableHead className="w-8">
          <SelectPageCheckbox
            selectedIds={selectedIds}
            onSelectedIdsChange={onSelectedIdsChange}
          />
        </TableHead>
        {FIXED_COLUMNS.map((label) => (
          <TableHead key={label} className="whitespace-nowrap">
            {label}
          </TableHead>
        ))}
        {metrics.map((metric) => (
          <TableHead key={metric.id} className="whitespace-nowrap">
            {metric.name}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
