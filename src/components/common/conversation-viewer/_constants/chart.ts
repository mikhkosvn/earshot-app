export const MetricChartTab = {
  latency: 'latency',
  pitch: 'pitch',
} as const;

export type MetricChartTab =
  (typeof MetricChartTab)[keyof typeof MetricChartTab];

export const CHART_LINE_COLOR = '#e8643c';

export const PERCENTILE_COLORS: Record<string, string> = {
  p25: '#3b82f6',
  p50: '#22c55e',
  p75: '#a855f7',
  p90: '#ef4444',
  p95: '#f97316',
  p99: '#7c2d12',
};

export const AVERAGE_LINE_COLOR = '#3b82f6';

export const FALLBACK_LINE_COLOR = '#64748b';
