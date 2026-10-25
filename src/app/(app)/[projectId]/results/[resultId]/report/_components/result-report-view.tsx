'use client';

import { REPORT_PRINT_STYLE, REPORT_ROOT_ID } from '../_constants/report-print';
import { usePrintOnce } from '../_hooks/use-print-once';
import { PrintReportButton } from './print-report-button';
import { ReportHeader } from './header/report-header';
import { ReportMetricList } from './metrics/report-metric-list';
import { ReportSummary } from './report-summary';

export function ResultReportView() {
  usePrintOnce();

  return (
    <article
      id={REPORT_ROOT_ID}
      className="mx-auto flex max-w-3xl flex-col gap-6 bg-background p-6 text-foreground"
    >
      <style href="result-report-print" precedence="default">
        {REPORT_PRINT_STYLE}
      </style>
      <div className="flex items-start justify-between gap-4">
        <ReportHeader />
        <PrintReportButton />
      </div>
      <ReportSummary />
      <ReportMetricList />
    </article>
  );
}
