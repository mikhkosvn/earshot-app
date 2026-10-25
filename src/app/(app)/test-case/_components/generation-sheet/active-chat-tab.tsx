'use client';

import { useGenerationSheetParams } from '../../_hooks/generation/use-generation-sheet-params';
import { JobSessionChat } from './job-session-chat';
import { NoSessionNotice } from './no-session-notice';
import { SessionChat } from './chat/session-chat';

export function ActiveChatTab() {
  const [{ sessionId, progressId }] = useGenerationSheetParams();

  if (sessionId !== null) return <SessionChat sessionId={sessionId} />;
  if (progressId) return <JobSessionChat jobId={progressId} />;
  return <NoSessionNotice />;
}
