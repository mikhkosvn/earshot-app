import 'server-only';

import {
  CALL_ENDED_REASON_LABEL,
  TRANSCRIPT_ROLE_LABEL,
  TranscriptRole,
} from '@/server/call-engine/constants';
import type { PlacedCall } from '@/server/call-engine/types';
import {
  TEST_CALL_IN_PROGRESS_HEADLINE,
  TEST_CALL_TRANSCRIPT_PREVIEW_TURNS,
  TEST_CONNECTION_STATUS_LABEL,
  TestConnectionStatus,
  TestStepKey,
  TestStepStatus,
  TestVerdict,
} from '@/server/agents/constants/test-call';
import type { ConnectionType } from '@/server/agents/constants/connection-type';
import type {
  TestCallProgress,
  TestConnectionProgress,
  TestStep,
} from '@/server/agents/types';

type StepStatuses = Record<TestStepKey, TestStepStatus>;

const buildSteps = (
  target: string | null,
  statuses: StepStatuses,
): TestStep[] => [
  {
    key: TestStepKey.configuration,
    label: 'Preparing the test call',
    status: statuses.configuration,
  },
  {
    key: TestStepKey.place,
    label: `Calling ${target ?? 'your agent'}`,
    status: statuses.place,
  },
  {
    key: TestStepKey.answer,
    label: 'Waiting for your agent to answer and speak',
    status: statuses.answer,
  },
];

const emptyConnection = (
  type: ConnectionType,
  target: string | null,
  status: TestConnectionStatus,
): TestConnectionProgress => ({
  type,
  status,
  statusLabel: TEST_CONNECTION_STATUS_LABEL[status],
  target,
  steps: [],
  agentFirstMessage: null,
  answeredAfterSeconds: null,
  durationSeconds: null,
  turnCount: 0,
  endedReason: null,
  transcriptPreview: [],
});

export const queuedProgress = (
  agentId: number,
  type: ConnectionType,
  target: string | null,
): TestCallProgress => ({
  agentId,
  verdict: null,
  headline: TEST_CALL_IN_PROGRESS_HEADLINE,
  connections: [emptyConnection(type, target, TestConnectionStatus.queued)],
});

export const inCallProgress = (
  agentId: number,
  type: ConnectionType,
  target: string | null,
): TestCallProgress => ({
  agentId,
  verdict: null,
  headline: TEST_CALL_IN_PROGRESS_HEADLINE,
  connections: [
    {
      ...emptyConnection(type, target, TestConnectionStatus.in_call),
      steps: buildSteps(target, {
        configuration: TestStepStatus.passed,
        place: TestStepStatus.passed,
        answer: TestStepStatus.running,
      }),
    },
  ],
});

const formatClock = (seconds: number) => {
  const whole = Math.max(0, Math.floor(seconds));
  const minutes = String(Math.floor(whole / 60)).padStart(2, '0');
  const rest = String(whole % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
};

const roundTenth = (value: number) => Math.round(value * 10) / 10;

const answeredAfter = (turn: { startTime: number } | undefined) => {
  if (!turn) return null;
  return roundTenth(turn.startTime);
};

const finalStatus = (call: PlacedCall, agentSpoke: boolean) => {
  if (call.turns.length === 0) return TestConnectionStatus.failed;
  if (!agentSpoke) return TestConnectionStatus.unverified;
  return TestConnectionStatus.passed;
};

const answerStepStatus = (status: TestConnectionStatus) => {
  if (status === TestConnectionStatus.passed) return TestStepStatus.passed;
  return TestStepStatus.failed;
};

const verdictOf = (status: TestConnectionStatus) => {
  if (status === TestConnectionStatus.passed) return TestVerdict.all_passed;
  return TestVerdict.all_failed;
};

const headlineOf = (status: TestConnectionStatus) => {
  if (status === TestConnectionStatus.passed) {
    return 'All 1 connections are working — your agent answered and replied on each one.';
  }
  if (status === TestConnectionStatus.unverified) {
    return 'Your agent answered but did not reply on 1 connection.';
  }
  return 'Your agent did not answer on 1 connection.';
};

export const finishedProgress = (
  agentId: number,
  type: ConnectionType,
  target: string | null,
  call: PlacedCall,
): TestCallProgress => {
  const firstAgentTurn = call.turns.find(
    (turn) => turn.role === TranscriptRole.main_agent,
  );
  const status = finalStatus(call, Boolean(firstAgentTurn));
  return {
    agentId,
    verdict: verdictOf(status),
    headline: headlineOf(status),
    connections: [
      {
        type,
        status,
        statusLabel: TEST_CONNECTION_STATUS_LABEL[status],
        target,
        steps: buildSteps(target, {
          configuration: TestStepStatus.passed,
          place: TestStepStatus.passed,
          answer: answerStepStatus(status),
        }),
        agentFirstMessage: firstAgentTurn?.content ?? null,
        answeredAfterSeconds: answeredAfter(firstAgentTurn),
        durationSeconds: Math.round(call.durationSeconds),
        turnCount: call.turns.length,
        endedReason: CALL_ENDED_REASON_LABEL[call.endedReason],
        transcriptPreview: call.turns
          .slice(0, TEST_CALL_TRANSCRIPT_PREVIEW_TURNS)
          .map((turn) => ({
            role: TRANSCRIPT_ROLE_LABEL[turn.role],
            content: turn.content,
            time: formatClock(turn.startTime),
          })),
      },
    ],
  };
};
