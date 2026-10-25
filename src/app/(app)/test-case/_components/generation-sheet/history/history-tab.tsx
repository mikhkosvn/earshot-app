'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useGenerationSheetParams } from '@/app/(app)/test-case/_hooks/generation/use-generation-sheet-params';
import { EvaluatorService } from '@/app/(app)/test-case/_service';

import { HistoryEmpty } from './history-empty';
import { HistoryRow } from './history-row';

interface HistoryTabProps {
  onOpenSession: () => void;
}

export function HistoryTab({ onOpenSession }: HistoryTabProps) {
  const projectId = useCurrentProjectId();
  const [, setParams] = useGenerationSheetParams();
  const { data: sessions } = useSuspenseQuery(
    EvaluatorService.getGenerationSessionsQuery({ projectId }),
  );

  if (sessions.length === 0) return <HistoryEmpty />;

  return (
    <ul className="flex flex-col divide-y">
      {sessions.map((session) => (
        <HistoryRow
          key={session.id}
          session={session}
          onOpen={async () => {
            await setParams({
              reopenSheet: true,
              sessionId: session.id,
              progressId: null,
            });
            onOpenSession();
          }}
        />
      ))}
    </ul>
  );
}
