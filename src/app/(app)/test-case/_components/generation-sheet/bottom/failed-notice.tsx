import { getSessionError } from '@/app/(app)/test-case/_utils/generation-stage';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';

type FailedNoticeProps = {
  session: GenerationSessionView;
};

export function FailedNotice({ session }: FailedNoticeProps) {
  return (
    <div role="alert" className="border-t p-3 text-xs text-destructive">
      {getSessionError(session)} Start a new generation to try again.
    </div>
  );
}
