import type { ConnectionCheck } from '@/server/agents/types';

type UntestableNoteProps = {
  check: ConnectionCheck;
};

export function UntestableNote({ check }: UntestableNoteProps) {
  if (check.connections.some((connection) => connection.testable)) return null;
  return <p>None of them can be verified by a test call.</p>;
}
