import { Spinner } from '@/components/ui/spinner';
import { CallProcessingStatusLabel } from '@/server/call-logs/constants/call-processing-status-labels';
import type { CallLogDetail } from '@/server/call-logs/types';

interface CallProcessingStateProps {
  call: CallLogDetail;
}

export function CallProcessingState({ call }: CallProcessingStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <Spinner className="size-5" />
      <p className="text-sm font-medium">{call.callId}</p>
      <p className="text-xs text-muted-foreground">
        {CallProcessingStatusLabel[call.status]}. The call details show when the
        processing ends.
      </p>
    </div>
  );
}
