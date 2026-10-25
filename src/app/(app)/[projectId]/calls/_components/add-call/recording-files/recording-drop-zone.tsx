'use client';

import { UploadIcon } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CALL_UPLOAD_ACCEPT } from '@/server/call-logs/constants/call-upload-format';

type RecordingDropZoneProps = {
  onAdd: (files: File[]) => void;
};

export function RecordingDropZone({ onAdd }: RecordingDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex flex-col items-center gap-1.5 rounded-lg border-2 border-dashed p-6 text-center text-xs text-muted-foreground"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onAdd(Array.from(event.dataTransfer.files));
      }}
    >
      <UploadIcon className="size-5" />
      <p>
        Drag &amp; Drop or{' '}
        <Button
          type="button"
          variant="link"
          size="unstyled"
          className="text-xs"
          onClick={() => inputRef.current?.click()}
        >
          Choose files
        </Button>{' '}
        to upload (Optional)
      </p>
      <p>Max 5 files, 500MB total. Formats: MP3, MP4, WAV, OGG</p>
      <Input
        ref={inputRef}
        type="file"
        multiple
        accept={CALL_UPLOAD_ACCEPT}
        aria-label="Recording files"
        className="hidden"
        onChange={(event) => {
          onAdd(Array.from(event.target.files ?? []));
          event.target.value = '';
        }}
      />
    </div>
  );
}
