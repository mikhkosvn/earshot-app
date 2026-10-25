'use client';

import { ConversationViewerLayout } from '@/components/common/conversation-viewer/conversation-viewer-layout';

import { useRunDetailQuery } from '../../../_hooks/runs/use-run-detail-query';
import { RunDetailActions } from './run-detail-actions';
import { RunDetailHeader } from './header/run-detail-header';

type RunDetailBodyProps = {
  runId: number;
};

export function RunDetailBody({ runId }: RunDetailBodyProps) {
  const { data: run } = useRunDetailQuery(runId);

  return (
    <ConversationViewerLayout
      conversationId={run.conversationId}
      header={<RunDetailHeader runId={runId} />}
      actions={<RunDetailActions runId={runId} />}
    />
  );
}
