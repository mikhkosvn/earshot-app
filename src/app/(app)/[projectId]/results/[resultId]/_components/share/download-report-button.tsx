'use client';

import { FileDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useOpenResultReport } from '../../_hooks/share/use-open-result-report';

type DownloadReportButtonProps = {
  metricIds: number[];
  onDownloaded: () => void;
};

export function DownloadReportButton({
  metricIds,
  onDownloaded,
}: DownloadReportButtonProps) {
  const openReport = useOpenResultReport();

  return (
    <Button
      size="sm"
      disabled={metricIds.length === 0}
      onClick={() => {
        openReport(metricIds);
        onDownloaded();
      }}
    >
      <FileDownIcon />
      Download Report
    </Button>
  );
}
