export const InsightsActionOperation = {
  listInsightMetricOptions: 'insights.list_insight_metric_options',
  getInsightsOverview: 'insights.get_insights_overview',
  getDeepResearch: 'insights.get_deep_research',
  saveInsightConfig: 'insights.save_insight_config',
  turnOffInsights: 'insights.turn_off_insights',
  setNewCategoryAlert: 'insights.set_new_category_alert',
  startInsightRun: 'insights.start_insight_run',
  dismissCategory: 'insights.dismiss_category',
  startDeepResearch: 'insights.start_deep_research',
  dismissResearchMode: 'insights.dismiss_research_mode',
} as const;

export type InsightsActionOperation =
  (typeof InsightsActionOperation)[keyof typeof InsightsActionOperation];
