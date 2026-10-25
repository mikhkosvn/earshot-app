'use client';

import { DownloadIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { useExportResultsMutation } from '../../../_hooks/mutations/results-list/use-export-results-mutation';
import { useIsExportingResults } from '../../../_hooks/results-list/use-is-exporting-results';
import { useResultFilterParams } from '../../../_hooks/use-result-filter-params';
import { toResultFilters } from '../../../_utils/filters-input';

export function ExportAllButton() {
  const projectId = useCurrentProjectId();
  const [params] = useResultFilterParams();
  const exportResults = useExportResultsMutation();
  const isExporting = useIsExportingResults();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="text-xs"
      disabled={isExporting}
      onClick={() =>
        exportResults.mutate({ projectId, filters: toResultFilters(params) })
      }
    >
      <DownloadIcon />
      Export All
    </Button>
  );
}
