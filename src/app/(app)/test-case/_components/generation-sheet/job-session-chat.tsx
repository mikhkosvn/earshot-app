'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { JobService } from '@/components/common/background-tasks/_service';

import { SessionChat } from './chat/session-chat';
import { NoSessionNotice } from './no-session-notice';

type JobSessionChatProps = {
  jobId: string;
};

const sessionIdOf = (input: unknown) => {
  if (typeof input !== 'object' || input === null) return null;
  const value = (input as { sessionId?: unknown }).sessionId;
  if (typeof value !== 'number') return null;
  return value;
};

export function JobSessionChat({ jobId }: JobSessionChatProps) {
  const { data: sessionId } = useSuspenseQuery({
    ...JobService.getJobQuery({ jobId }),
    select: (job) => sessionIdOf(job.input),
  });

  if (sessionId === null) return <NoSessionNotice />;
  return <SessionChat sessionId={sessionId} />;
}
