import { CircleCheckIcon, CircleXIcon, LoaderCircleIcon } from 'lucide-react';

import { TestConnectionStatus } from '@/server/agents/constants/test-call';

interface ConnectionStatusIconProps {
  status: TestConnectionStatus;
}

export function ConnectionStatusIcon({ status }: ConnectionStatusIconProps) {
  if (status === TestConnectionStatus.passed) {
    return (
      <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-green-600" />
    );
  }
  if (
    status === TestConnectionStatus.failed ||
    status === TestConnectionStatus.unverified
  ) {
    return <CircleXIcon className="mt-0.5 size-4 shrink-0 text-red-600" />;
  }
  return (
    <LoaderCircleIcon className="mt-0.5 size-4 shrink-0 animate-spin text-muted-foreground" />
  );
}
