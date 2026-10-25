'use client';

import { RUN_PAGE_PARAM } from '../../../_constants/result-params';
import { useResultRunsQuery } from '../../../_hooks/runs/use-result-runs-query';
import { useRunDetailParam } from '../../../_hooks/use-run-detail-param';
import { RESULT_RUN_COLUMNS } from '../../../_utils/runs/run-columns';
import {
  type RunSelection,
  RunsTable,
} from '../../../_components/runs-table/runs-table';

interface ResultRunsTableProps {
  selection: RunSelection;
}

export function ResultRunsTable({ selection }: ResultRunsTableProps) {
  const { data } = useResultRunsQuery();
  const [, setRunId] = useRunDetailParam();

  return (
    <RunsTable
      page={data}
      columns={RESULT_RUN_COLUMNS}
      pageParamKey={RUN_PAGE_PARAM}
      selection={selection}
      onOpenRun={(run) => void setRunId(run.id)}
    />
  );
}
