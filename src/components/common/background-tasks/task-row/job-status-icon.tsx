import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';
import { JobStatus } from '@/generated/prisma/enums';

type JobStatusIconProps = {
  status: JobStatus;
};

export function JobStatusIcon({ status }: JobStatusIconProps) {
  if (status === JobStatus.completed) {
    return (
      <CircleCheckIcon
        className="mt-0.5 size-4 shrink-0 text-green-600"
        aria-label="Completed"
      />
    );
  }
  if (status === JobStatus.failed) {
    return (
      <CircleAlertIcon
        className="mt-0.5 size-4 shrink-0 text-destructive"
        aria-label="Failed"
      />
    );
  }
  return <Spinner className="mt-0.5 shrink-0 text-muted-foreground" />;
}
