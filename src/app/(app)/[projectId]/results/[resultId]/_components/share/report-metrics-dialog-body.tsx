'use client';

import { Button } from '@/components/ui/button';

import { useReportMetricSelection } from '../../_hooks/share/use-report-metric-selection';
import { useResultDetail } from '../../_hooks/use-result-detail';
import { DownloadReportButton } from './download-report-button';
import { ReportMetricOption } from './report-metric-option';

type ReportMetricsDialogBodyProps = {
  onDownloaded: () => void;
};

export function ReportMetricsDialogBody({
  onDownloaded,
}: ReportMetricsDialogBodyProps) {
  const result = useResultDetail();
  const selection = useReportMetricSelection();

  return (
    <>
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2">
        <span className="text-sm text-muted-foreground">
          {selection.selectedIds.length} metrics selected
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={selection.selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={selection.clearAll}>
            Clear All
          </Button>
        </div>
      </div>
      <div className="flex max-h-80 flex-col gap-3 overflow-y-auto px-4 py-3">
        {result.reportMetrics.map((metric) => (
          <ReportMetricOption
            key={metric.metricId}
            metric={metric}
            checked={selection.selectedIds.includes(metric.metricId)}
            onCheckedChange={(checked) =>
              selection.toggle(metric.metricId, checked)
            }
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
        <p className="text-xs text-muted-foreground">
          PDF will include detailed analysis of selected metrics
        </p>
        <DownloadReportButton
          metricIds={selection.selectedIds}
          onDownloaded={onDownloaded}
        />
      </div>
    </>
  );
}
