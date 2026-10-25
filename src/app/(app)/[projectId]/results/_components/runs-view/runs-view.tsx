'use client';

import { useRouter } from 'next/navigation';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { TablePagination } from '@/components/common/table-pagination/table-pagination';
import { DEFAULT_PAGE_PARAM_KEY } from '@/components/common/table-pagination/pagination-config';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useProjectRunsQuery } from '../../_hooks/runs/use-project-runs-query';
import { PROJECT_RUN_COLUMNS } from '../../_utils/runs/run-columns';
import { RunsTable } from '../runs-table/runs-table';

export function RunsView() {
  const projectId = useCurrentProjectId();
  const router = useRouter();
  const { data } = useProjectRunsQuery();

  return (
    <div className="flex flex-col gap-2">
      <RunsTable
        page={data}
        columns={PROJECT_RUN_COLUMNS}
        pageParamKey={DEFAULT_PAGE_PARAM_KEY}
        onOpenRun={(run) =>
          router.push(
            UrlGenerator.result({
              projectId,
              resultId: run.resultId,
              values: { call_id: run.id },
            }),
          )
        }
      />
      <TablePagination totalCount={data.count} />
    </div>
  );
}
