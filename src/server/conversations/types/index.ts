import type { z } from 'zod';

import type {
  MetricEvalType,
  MetricEvaluationStatus,
  TranscriptRole,
} from '@/generated/prisma/enums';
import type { MetricValue } from '@/server/metrics/types';
import type { getConversationSchema } from '@/server/conversations/schemas';

export type GetConversationInput = z.input<typeof getConversationSchema>;

export type ConversationTurnItem = {
  id: number;
  position: number;
  role: TranscriptRole;
  content: string;
  startTime: number | null;
  endTime: number | null;
};

export type ConversationMetricItem = {
  evaluationId: number;
  metricId: number;
  name: string;
  description: string;
  evalType: MetricEvalType;
  functionName: string | null;
  enumValues: string[];
  status: MetricEvaluationStatus;
  value: MetricValue;
  normalizedScore: number | null;
  explanation: string[];
  extra: Record<string, unknown> | null;
  thumbsUp: boolean | null;
  voteFeedback: string | null;
};

export type ConversationWaveformView = {
  peaks: number[][];
  duration: number;
  testingChannelIndex: number;
};

export type ConversationMetadataTile = {
  key: string;
  value: string;
};

export type ConversationDetail = {
  id: number;
  projectId: number;
  recordingUrl: string | null;
  recordingDownloadUrl: string | null;
  waveform: ConversationWaveformView | null;
  durationSeconds: number;
  startedAt: Date | null;
  endedAt: Date | null;
  endedReason: string | null;
  expectedOutcomePrompt: string | null;
  turns: ConversationTurnItem[];
  metrics: ConversationMetricItem[];
  metadata: ConversationMetadataTile[];
};
