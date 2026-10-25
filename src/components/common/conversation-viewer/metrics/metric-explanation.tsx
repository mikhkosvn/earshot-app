import type { ConversationMetricItem } from '@/server/conversations/types';

type MetricExplanationProps = {
  metric: ConversationMetricItem;
};

export function MetricExplanation({ metric }: MetricExplanationProps) {
  if (metric.explanation.length === 0) {
    return <p>No explanation is available.</p>;
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {metric.explanation.map((line, index) => (
        <li key={index} className="whitespace-pre-line">
          {line}
        </li>
      ))}
    </ul>
  );
}
