'use client';

import { useConversation } from '../_hooks/use-conversation';
import { ViewerCollapsibleCard } from '../viewer-collapsible-card';
import { MetricCharts } from './charts/metric-charts';
import { MetricRows } from './metric-rows';

type ConversationMetricsCardProps = {
  conversationId: number;
  shareToken?: string | null;
};

export function ConversationMetricsCard({
  conversationId,
  shareToken = null,
}: ConversationMetricsCardProps) {
  const query = { conversationId, shareToken };
  const { metrics } = useConversation(query);

  return (
    <ViewerCollapsibleCard
      title="Metrics"
      description="Used to understand and evaluate the performance of your AI Voice Agent"
      total={metrics.length}
    >
      <MetricRows query={query} readOnly={shareToken !== null} />
      <MetricCharts query={query} />
    </ViewerCollapsibleCard>
  );
}
