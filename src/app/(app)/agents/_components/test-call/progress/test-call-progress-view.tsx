'use client';

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useJobProgress } from '@/hooks/use-job-progress';

import { testCallProgressOf } from '../../../_utils/test-call-progress';
import { ConnectionProgressCard } from './connection/connection-progress-card';
import { isJobFinished } from '../../../_utils/job-finished';
import { TestCallHeadline } from './test-call-headline';
import { TestCallProgressFooter } from './test-call-progress-footer';
import { TestCallTitle } from './test-call-title';

type TestCallProgressViewProps = {
  jobId: string;
  onClose: () => void;
};

export function TestCallProgressView({
  jobId,
  onClose,
}: TestCallProgressViewProps) {
  const { data: job } = useJobProgress(jobId);
  const progress = testCallProgressOf(job);
  const finished = isJobFinished(job?.status);

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <TestCallTitle finished={finished} />
        </DialogTitle>
        <DialogDescription>
          <TestCallHeadline progress={progress} error={job?.error ?? null} />
        </DialogDescription>
      </DialogHeader>
      {progress?.connections.map((connection) => (
        <ConnectionProgressCard key={connection.type} connection={connection} />
      ))}
      <TestCallProgressFooter finished={finished} onClose={onClose} />
    </>
  );
}
