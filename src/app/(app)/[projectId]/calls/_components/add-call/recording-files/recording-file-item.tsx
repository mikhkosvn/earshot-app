import { FileAudioIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { fileSizeText } from '../../../_utils/file-size-text';

interface RecordingFileItemProps {
  file: File;
  onRemove: () => void;
}

export function RecordingFileItem({ file, onRemove }: RecordingFileItemProps) {
  return (
    <li className="flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs">
      <FileAudioIcon className="size-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1 truncate">{file.name}</span>
      <span className="text-muted-foreground">{fileSizeText(file.size)}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Remove ${file.name}`}
        onClick={onRemove}
      >
        <XIcon />
      </Button>
    </li>
  );
}
