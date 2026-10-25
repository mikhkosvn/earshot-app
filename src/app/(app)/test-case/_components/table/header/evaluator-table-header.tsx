'use client';

import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EvaluatorSortField } from '@/server/evaluators/constants/evaluator-list';

import { ExpandAllIcon } from './expand-all-icon';
import { SortableHead } from './sortable-head';

interface EvaluatorTableHeaderProps {
  rowIds: number[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  expandedIds: readonly number[];
  onExpandedChange: (ids: number[]) => void;
}

const nextIds = (isAll: boolean, rowIds: number[]) => {
  if (isAll) return [];
  return rowIds;
};

export function EvaluatorTableHeader({
  rowIds,
  selectedIds,
  onSelectionChange,
  expandedIds,
  onExpandedChange,
}: EvaluatorTableHeaderProps) {
  const allSelected =
    rowIds.length > 0 && rowIds.every((id) => selectedIds.includes(id));
  const allExpanded =
    rowIds.length > 0 && rowIds.every((id) => expandedIds.includes(id));

  return (
    <TableHeader className="bg-muted/50">
      <TableRow>
        <TableHead className="w-8">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Expand or collapse all rows"
            onClick={() => onExpandedChange(nextIds(allExpanded, rowIds))}
          >
            <ExpandAllIcon
              isExpanded={allExpanded}
              expandIcon={<ChevronsUpDownIcon />}
              collapseIcon={<ChevronsDownUpIcon />}
            />
          </Button>
        </TableHead>
        <TableHead className="w-28">
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all evaluators"
              checked={allSelected}
              onCheckedChange={() =>
                onSelectionChange(nextIds(allSelected, rowIds))
              }
            />
            <SortableHead field={EvaluatorSortField.id} label="ID" />
          </div>
        </TableHead>
        <TableHead>
          <SortableHead field={EvaluatorSortField.name} label="Name" />
        </TableHead>
        <TableHead>
          <SortableHead
            field={EvaluatorSortField.personality}
            label="Personality"
          />
        </TableHead>
        <TableHead>
          <SortableHead field={EvaluatorSortField.agent} label="Agent" />
        </TableHead>
        <TableHead>Phone Number</TableHead>
        <TableHead>
          <SortableHead
            field={EvaluatorSortField.testProfile}
            label="Test Profile"
          />
        </TableHead>
        <TableHead>
          <SortableHead field={EvaluatorSortField.language} label="Language" />
        </TableHead>
        <TableHead>Metrics</TableHead>
        <TableHead>Tags</TableHead>
        <TableHead>
          <SortableHead
            field={EvaluatorSortField.createdAt}
            label="Created At"
          />
        </TableHead>
        <TableHead>
          <SortableHead
            field={EvaluatorSortField.updatedAt}
            label="Updated At"
          />
        </TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
