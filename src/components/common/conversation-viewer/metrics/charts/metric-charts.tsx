'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PredefinedFunction } from '@/server/metrics/constants/scoring/predefined-function';

import { AVERAGE_LINE_COLOR, MetricChartTab } from '../../_constants/chart';
import { useConversation } from '../../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../../_service';
import {
  averageOf,
  findMetricByFunction,
  type GraphLine,
  type GraphPoint,
  graphPoints,
  percentileLines,
} from '../../_utils/metric-graph';
import { MetricLineChart } from './metric-line-chart';

interface MetricChartsProps {
  query: ConversationQueryArgs;
}

const averageLines = (points: GraphPoint[]): GraphLine[] => {
  const average = averageOf(points);
  if (average === null) return [];
  return [
    {
      key: 'avg',
      label: `Avg (${average} Hz)`,
      value: average,
      color: AVERAGE_LINE_COLOR,
    },
  ];
};

const firstTab = (latency: GraphPoint[]) => {
  if (latency.length > 0) return MetricChartTab.latency;
  return MetricChartTab.pitch;
};

export function MetricCharts({ query }: MetricChartsProps) {
  const { metrics, durationSeconds } = useConversation(query);
  const latencyMetric = findMetricByFunction(
    metrics,
    PredefinedFunction.get_latency,
  );
  const pitchMetric = findMetricByFunction(
    metrics,
    PredefinedFunction.get_average_pitch,
  );
  const latency = graphPoints(latencyMetric, MetricChartTab.latency);
  const pitch = graphPoints(pitchMetric, MetricChartTab.pitch);
  if (latency.length === 0 && pitch.length === 0) return null;

  return (
    <Tabs defaultValue={firstTab(latency)} className="mt-5">
      <TabsList variant="line">
        <TabsTrigger value={MetricChartTab.latency}>Latency</TabsTrigger>
        <TabsTrigger value={MetricChartTab.pitch}>Pitch</TabsTrigger>
      </TabsList>
      <TabsContent value={MetricChartTab.latency}>
        <MetricLineChart
          points={latency}
          lines={percentileLines(latencyMetric, 'ms')}
          duration={durationSeconds}
          valueLabel="Latency (ms)"
        />
      </TabsContent>
      <TabsContent value={MetricChartTab.pitch}>
        <MetricLineChart
          points={pitch}
          lines={averageLines(pitch)}
          duration={durationSeconds}
          valueLabel="Pitch (Hz)"
        />
      </TabsContent>
    </Tabs>
  );
}
