import { CONNECTION_TYPE_LABEL } from '@/server/agents/constants/connection-type';
import type { TestConnectionProgress } from '@/server/agents/types';

import { ConnectionStatusIcon } from './connection-status-icon';
import { ConnectionStatusText } from './connection-status-text';
import { FirstMessageQuote } from './first-message-quote';
import { TestStepRow } from './test-step-row';
import { TranscriptPreview } from './transcript-preview';

type ConnectionProgressCardProps = {
  connection: TestConnectionProgress;
};

export function ConnectionProgressCard({
  connection,
}: ConnectionProgressCardProps) {
  return (
    <div
      data-status={connection.status}
      className="flex gap-2.5 rounded-lg border bg-muted/40 p-3 text-sm data-[status=failed]:border-red-300 data-[status=failed]:bg-red-50 data-[status=passed]:border-green-300 data-[status=passed]:bg-green-50 dark:data-[status=failed]:bg-red-950 dark:data-[status=passed]:bg-green-950"
    >
      <ConnectionStatusIcon status={connection.status} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p>
          <span className="font-medium">
            {CONNECTION_TYPE_LABEL[connection.type]}
          </span>{' '}
          <span className="text-muted-foreground">
            <ConnectionStatusText connection={connection} />
          </span>
        </p>
        <ul className="flex flex-col gap-1">
          {connection.steps.map((step) => (
            <TestStepRow key={step.key} step={step} />
          ))}
        </ul>
        <FirstMessageQuote message={connection.agentFirstMessage} />
        <TranscriptPreview lines={connection.transcriptPreview} />
      </div>
    </div>
  );
}
