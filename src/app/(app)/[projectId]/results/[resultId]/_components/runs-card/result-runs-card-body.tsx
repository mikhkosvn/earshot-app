'use client';

import { useState } from 'react';

import { RUN_PAGE_PARAM } from '../../../_constants/result-params';
import { ResultRunsPagination } from './result-runs-pagination';
import { ResultRunsTable } from './result-runs-table';
import { RunsCardTitle } from './runs-card-title';
import { RunsCardToolbar } from './toolbar/runs-card-toolbar';

export function ResultRunsCardBody() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <section className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
        <RunsCardTitle />
        <RunsCardToolbar
          selectedIds={selectedIds}
          onCleared={() => setSelectedIds([])}
        />
      </div>
      <ResultRunsTable
        selection={{ selectedIds, onSelectedIdsChange: setSelectedIds }}
      />
      <ResultRunsPagination pageParamKey={RUN_PAGE_PARAM} />
    </section>
  );
}
