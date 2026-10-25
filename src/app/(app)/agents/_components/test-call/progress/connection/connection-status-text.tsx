import { TestConnectionStatus } from '@/server/agents/constants/test-call';
import type { TestConnectionProgress } from '@/server/agents/types';

type ConnectionStatusTextProps = {
  connection: TestConnectionProgress;
};

export function ConnectionStatusText({
  connection,
}: ConnectionStatusTextProps) {
  if (
    connection.status === TestConnectionStatus.passed &&
    connection.answeredAfterSeconds !== null
  ) {
    return `Your agent answered and replied after ${connection.answeredAfterSeconds}s`;
  }
  return connection.statusLabel;
}
