import 'server-only';

import { formatCallDuration } from '@/server/call-logs/utils/payload/format-call-duration';
import { DAILY_REPORT_HOUR_LABEL } from '@/server/daily-report/constants';
import type { DailyReport, ReportTotals } from '@/server/daily-report/types';
import { reportDateLabel } from '@/server/dashboards/utils/time/time-labels';

const ratioText = (ratio: number | null) => {
  if (ratio === null) return 'No evaluated items';
  return `${ratio.toFixed(1)}%`;
};

const latencyText = (latency: number | null) => {
  if (latency === null) return 'No data';
  return `${Math.round(latency)} ms`;
};

const totalsLines = (noun: string, totals: ReportTotals) => [
  `- Number of ${noun}: ${totals.count}`,
  `- Success ratio: ${ratioText(totals.successRatio)}`,
  `- Total minutes: ${formatCallDuration(totals.totalSeconds)}`,
  `- Median latency: ${latencyText(totals.medianLatency)}`,
];

export const dailyReportDateLabel = (report: DailyReport) =>
  reportDateLabel(report.windowEnd, report.timeZone);

export const dailyReportSubject = (report: DailyReport) => {
  const date = dailyReportDateLabel(report);
  if (report.calls.count === 0) {
    return `Daily report for ${report.projectName}: no calls on ${date}`;
  }
  return `Daily report for ${report.projectName}: ${date}`;
};

const callSection = (report: DailyReport) => {
  if (report.calls.count === 0) {
    return [
      'Calls',
      `No calls were received in the 24 hours before ${DAILY_REPORT_HOUR_LABEL}.`,
    ];
  }
  return ['Calls', ...totalsLines('calls', report.calls)];
};

const runSection = (report: DailyReport) => {
  if (report.runs.count === 0) return [];
  return ['', 'Simulation runs', ...totalsLines('runs', report.runs)];
};

const aiSection = (report: DailyReport) => {
  if (!report.aiSummary) return [];
  return ['', 'AI summary', report.aiSummary];
};

const dashboardSections = (report: DailyReport) =>
  report.dashboards.flatMap((dashboard) => [
    '',
    `Dashboard: ${dashboard.name}`,
    ...dashboard.plots.map((plot) => `- ${plot.name}: ${plot.summary}`),
  ]);

export const dailyReportBody = (report: DailyReport) =>
  [
    `Daily report for ${report.projectName}`,
    `${dailyReportDateLabel(report)}. The report covers the 24 hours before ${DAILY_REPORT_HOUR_LABEL} (${report.timeZone}).`,
    '',
    ...callSection(report),
    ...runSection(report),
    ...aiSection(report),
    ...dashboardSections(report),
  ].join('\n');

const totalsPayload = (totals: ReportTotals) => ({
  count: totals.count,
  success_ratio: totals.successRatio,
  total_seconds: Math.round(totals.totalSeconds),
  median_latency_ms: totals.medianLatency,
});

export const dailyReportPayload = (report: DailyReport) => ({
  project_id: report.projectId,
  project_name: report.projectName,
  report_date: report.reportDate,
  timezone: report.timeZone,
  window_start: report.windowStart.toISOString(),
  window_end: report.windowEnd.toISOString(),
  calls: totalsPayload(report.calls),
  runs: totalsPayload(report.runs),
  dashboards: report.dashboards.map((dashboard) => ({
    id: dashboard.id,
    name: dashboard.name,
    plots: dashboard.plots,
  })),
  ai_summary: report.aiSummary,
});
