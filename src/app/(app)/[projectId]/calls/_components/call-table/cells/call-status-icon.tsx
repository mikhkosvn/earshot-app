import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';
import { CallProcessingStatus } from '@/generated/prisma/enums';

interface CallStatusIconProps {
  status: CallProcessingStatus;
}

export function CallStatusIcon({ status }: CallStatusIconProps) {
  if (status === CallProcessingStatus.failed) {
    return <CircleAlertIcon className="size-3" />;
  }
  if (status === CallProcessingStatus.completed) {
    return <CircleCheckIcon className="size-3" />;
  }
  return <Spinner className="size-3" />;
}
