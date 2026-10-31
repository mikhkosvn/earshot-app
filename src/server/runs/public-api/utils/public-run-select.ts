import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { publicPersonalitySelect } from '@/server/personalities/public-api/public-personality-id';
import { PUBLIC_EVALUATION_STATUSES } from '@/server/runs/public-api/constants';

export const publicRunSelect = {
  id: true,
  resultId: true,
  conversationId: true,
  evaluatorId: true,
  status: true,
  evaluationStatus: true,
  feedback: true,
  errorMessage: true,
  callerNumber: true,
  evaluatorSnapshot: true,
  testProfileSnapshot: true,
  executedAt: true,
  createdAt: true,
  result: {
    select: {
      name: true,
      agentId: true,
      agentNumber: true,
      agent: { select: { name: true, phoneNumber: true } },
      mockTools: { select: { mockTool: { select: { name: true } } } },
    },
  },
  evaluator: {
    select: { name: true, scenarioType: true, expectedOutcomePrompt: true },
  },
  personality: { select: { name: true, ...publicPersonalitySelect } },
  conversation: {
    select: {
      startedAt: true,
      endedAt: true,
      endedReason: true,
      metadata: true,
      providerCallId: true,
      providerCallData: true,
      recordingFileId: true,
      turns: {
        orderBy: { position: Prisma.SortOrder.asc },
        select: { role: true, content: true, startTime: true, endTime: true },
      },
      metricEvaluations: {
        where: { status: { in: PUBLIC_EVALUATION_STATUSES } },
        orderBy: [
          { metric: { displayOrder: Prisma.SortOrder.asc } },
          { metricId: Prisma.SortOrder.asc },
        ],
        select: {
          metricId: true,
          status: true,
          valueNumber: true,
          valueBoolean: true,
          valueText: true,
          normalizedScore: true,
          explanation: true,
          extra: true,
          errorMessage: true,
          metric: {
            select: {
              name: true,
              type: true,
              evalType: true,
              predefinedMetric: { select: { code: true, functionName: true } },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.RunSelect;

export type PublicRunRow = Prisma.RunGetPayload<{
  select: typeof publicRunSelect;
}>;
