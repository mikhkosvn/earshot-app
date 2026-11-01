'use client';

import { FlexRender } from '@tanstack/react-table';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { EvaluatorTableInstance } from '../../../_constants/evaluator-table/evaluator-table-features';

interface EvaluatorTableHeaderProps {
  table: EvaluatorTableInstance;
}

export function EvaluatorTableHeader({ table }: EvaluatorTableHeaderProps) {
  return (
    <TableHeader className="bg-muted/50">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className={header.column.columnDef.meta?.headClassName}
            >
              <FlexRender header={header} />
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
