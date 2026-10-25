import type { LabRowView } from '@/server/labs/types';

import { RowVariablesDialog } from '../../dialogs/row-variables-dialog';
import { RecordingPlayer } from './recording-player';
import { SourceLink } from './source-link';
import { TranscriptPreview } from './transcript-preview';

interface RecordingCellProps {
  row: LabRowView;
}

export function RecordingCell({ row }: RecordingCellProps) {
  return (
    <div className="flex w-96 flex-col gap-2">
      <span className="text-sm font-medium">{row.source.id}</span>
      <div className="flex items-center gap-2">
        <RecordingPlayer url={row.recordingUrl} />
        <SourceLink source={row.source} />
      </div>
      <TranscriptPreview lines={row.transcript} />
      <RowVariablesDialog variables={row.variables} />
    </div>
  );
}
