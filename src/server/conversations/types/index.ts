import type { z } from 'zod';

import type {
  MetricEvalType,
  MetricEvaluationStatus,
  TranscriptRole,
} from '@/generated/prisma/enums';
import type { ConversationSource } from '@/server/conversations/constants/conversation-source';
import type { MetricValue } from '@/server/metrics/types';
import type { getConversationSchema } from '@/server/conversations/schemas';

export type GetConversationInput = z.input<typeof getConversationSchema>;

export interface ConversationTurnItem {
  id: number;
  position: number;
  role: TranscriptRole;
  content: string;
  startTime: number | null;
  endTime: number | null;
}

export interface ConversationMetricItem {
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
}

export interface ConversationWaveformView {
  peaks: number[][];
  duration: number;
  testingChannelIndex: number;
}

export interface ConversationMetadataTile {
  key: string;
  value: string;
}

export interface ConversationDetail {
  id: number;
  projectId: number;
  source: ConversationSource;
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
}
