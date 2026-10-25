import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  LoaderCircleIcon,
} from 'lucide-react';

import { TestStepStatus } from '@/server/agents/constants/test-call';

interface TestStepIconProps {
  status: TestStepStatus;
}

export function TestStepIcon({ status }: TestStepIconProps) {
  if (status === TestStepStatus.passed) {
    return <CircleCheckIcon className="size-3.5 text-green-600" />;
  }
  if (status === TestStepStatus.failed) {
    return <CircleXIcon className="size-3.5 text-red-600" />;
  }
  if (status === TestStepStatus.running) {
    return (
      <LoaderCircleIcon className="size-3.5 animate-spin text-muted-foreground" />
    );
  }
  return <CircleDashedIcon className="size-3.5 text-muted-foreground" />;
}
