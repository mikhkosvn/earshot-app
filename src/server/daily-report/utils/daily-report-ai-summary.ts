import 'server-only';

import { generateText } from '@/server/ai/generate-text';
import type { DailyReport } from '@/server/daily-report/types';

import { dailyReportBody } from './format-daily-report';

const SYSTEM_PROMPT = [
  'You write the AI summary of a daily report about AI voice agent calls.',
  'Start with the heading "Top Issues".',
  'Write 2 to 4 short bullet points. Each bullet names one problem and its number.',
  'If there is no problem, say that the day had no problems.',
  'Use plain, short sentences. Do not invent numbers.',
].join(' ');

const failureLine = (noun: string, count: number, ratio: number | null) => {
  if (count === 0 || ratio === null) return [];
  const failed = Math.round(count * (1 - ratio / 100));
  if (failed === 0) return [];
  return [`- ${failed} of ${count} ${noun} did not pass the evaluation.`];
};

const latencyLine = (latency: number | null) => {
  if (latency === null) return [];
  return [`- The median latency was ${Math.round(latency)} ms.`];
};

const mockSummary = (report: DailyReport) => {
  const lines = [
    ...failureLine('calls', report.calls.count, report.calls.successRatio),
    ...failureLine('runs', report.runs.count, report.runs.successRatio),
    ...latencyLine(report.calls.medianLatency ?? report.runs.medianLatency),
  ];
  if (report.calls.count === 0 && report.runs.count === 0) {
    lines.push('- No calls and no runs happened in the report window.');
  }
  if (lines.length === 0) lines.push('- The day had no problems.');
  return ['Top Issues', ...lines].join('\n');
};

export const dailyReportAiSummary = (report: DailyReport) =>
  generateText({
    system: SYSTEM_PROMPT,
    prompt: dailyReportBody(report),
    maxTokens: 600,
    mock: () => mockSummary(report),
  });
