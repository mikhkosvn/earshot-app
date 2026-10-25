'use client';

import { useConversation } from '../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../_service';
import { MetricRow } from './metric-row';
import { MetricsEmpty } from './metrics-empty';

interface MetricRowsProps {
  query: ConversationQueryArgs;
  readOnly: boolean;
}

export function MetricRows({ query, readOnly }: MetricRowsProps) {
  const { metrics } = useConversation(query);
  if (metrics.length === 0) return <MetricsEmpty />;

  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {metrics.map((metric) => (
        <MetricRow
          key={metric.evaluationId}
          metric={metric}
          query={query}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}
