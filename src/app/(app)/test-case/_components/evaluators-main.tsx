'use client';

import { useState } from 'react';

import { EvaluatorsPagination } from './table/evaluators-pagination';
import { EvaluatorTable } from './table/evaluator-table';
import { EvaluatorsToolbar } from './toolbar/evaluators-toolbar';

interface EvaluatorsMainProps {
  onImproveOpen: () => void;
}

export function EvaluatorsMain({ onImproveOpen }: EvaluatorsMainProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
      <p className="text-xs text-muted-foreground">
        Evaluators are test scenarios that simulate real conversations against
        your agent, each paired with a persona and the metrics it should pass.
      </p>
      <EvaluatorsToolbar
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onImproveOpen={onImproveOpen}
      />
      <EvaluatorTable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
      <EvaluatorsPagination />
    </div>
  );
}
