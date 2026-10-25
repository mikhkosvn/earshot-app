import { CopyButton } from '@/components/common/clipboard/copy-button';

interface CallIdCellProps {
  callId: string;
}

export function CallIdCell({ callId }: CallIdCellProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="max-w-32 truncate rounded-sm border bg-background px-1.5 py-0.5 font-medium">
        {callId}
      </span>
      <span onClick={(event) => event.stopPropagation()}>
        <CopyButton value={callId} label={`Copy call ID ${callId}`} />
      </span>
    </div>
  );
}
