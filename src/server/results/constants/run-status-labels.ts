import { RunStatus } from '@/generated/prisma/enums';

export const RunStatusLabel: Record<RunStatus, string> = {
  [RunStatus.pending]: 'Pending',
  [RunStatus.in_queue]: 'In Queue',
  [RunStatus.scaling_up]: 'Scaling Up',
  [RunStatus.running]: 'Running',
  [RunStatus.in_progress]: 'In Progress',
  [RunStatus.evaluating]: 'Evaluating',
  [RunStatus.completed]: 'Completed',
  [RunStatus.failed]: 'Failed',
  [RunStatus.timeout]: 'Timeout',
  [RunStatus.cancelled]: 'Cancelled',
};
