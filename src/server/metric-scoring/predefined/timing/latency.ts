import 'server-only';

import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import { TranscriptRole } from '@/generated/prisma/enums';
import { turnLatencies } from '@/server/metric-scoring/predefined/timing/turn-latencies';
import type { ScoringConversation } from '@/server/metric-scoring/types';
import { completed } from '@/server/metric-scoring/utils/outcome';
import {
  mean,
  percentileSet,
  round2,
} from '@/server/metric-scoring/utils/statistics';

export const scoreLatency = (conversation: ScoringConversation) => {
  const latencies = turnLatencies(conversation);
  const values = latencies.map((latency) => latency.latencyMs);
  const average = mean(values);
  if (average === null) {
    return completed(null, [
      'No Main Agent response followed a Testing Agent turn, so no latency exists.',
    ]);
  }
  const percentiles = percentileSet(values);
  const firstTurn = values[0];
  return completed(
    round2(average),
    [
      `Average Latency: ${round2(average)}ms\nP50: ${percentiles.p50}ms, P95: ${percentiles.p95}ms, P99: ${percentiles.p99}ms\nFirst turn: ${firstTurn}ms`,
    ],
    {
      percentiles,
      first_turn: firstTurn,
      max_latency: Math.max(...values),
      graph_data: latencies.map((latency) => ({
        latency: latency.latencyMs,
        speaker: TranscriptRoleLabel[TranscriptRole.main_agent],
        start_time: latency.startTime,
      })),
    },
  );
};
