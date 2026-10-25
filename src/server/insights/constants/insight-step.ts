export const InsightStep = {
  weekly_deep_research: 'insights.weekly_deep_research',
} as const;

export type InsightStep = (typeof InsightStep)[keyof typeof InsightStep];
