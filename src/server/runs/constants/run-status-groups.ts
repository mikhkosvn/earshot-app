import { RunStatus } from '@/generated/prisma/enums';

export const QUEUED_RUN_STATUSES: RunStatus[] = [
  RunStatus.pending,
  RunStatus.in_queue,
];

export const ACTIVE_RUN_STATUSES: RunStatus[] = [
  RunStatus.scaling_up,
  RunStatus.running,
  RunStatus.in_progress,
  RunStatus.evaluating,
];

export const TERMINAL_RUN_STATUSES: RunStatus[] = [
  RunStatus.completed,
  RunStatus.failed,
  RunStatus.timeout,
  RunStatus.cancelled,
];

export const OPEN_RUN_STATUSES: RunStatus[] = [
  ...QUEUED_RUN_STATUSES,
  ...ACTIVE_RUN_STATUSES,
];

export const isTerminalRunStatus = (status: RunStatus) =>
  TERMINAL_RUN_STATUSES.includes(status);
