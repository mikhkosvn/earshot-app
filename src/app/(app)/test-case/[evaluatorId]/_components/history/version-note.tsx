import { HistoryChangeType } from '@/generated/prisma/enums';
import type { EvaluatorVersionView } from '@/server/evaluators/types';

type VersionNoteProps = {
  version: EvaluatorVersionView;
};

export function VersionNote({ version }: VersionNoteProps) {
  if (version.changeReason) {
    return (
      <span className="text-muted-foreground">{version.changeReason}</span>
    );
  }
  if (version.changeType === HistoryChangeType.created) {
    return <span className="text-muted-foreground">Initial version</span>;
  }
  return null;
}
