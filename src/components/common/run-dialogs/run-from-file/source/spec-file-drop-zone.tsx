'use client';

import { FileUpIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TEST_SUITE_SPEC_MAX_BYTES } from '@/server/runs/constants/run-limits';

import type { RunFromFileForm } from '../../_hooks/use-run-from-file-form';
import { SpecFileName } from './spec-file-name';

interface SpecFileDropZoneProps {
  form: RunFromFileForm;
}

const JSON_EXTENSION = '.json';

export function SpecFileDropZone({ form }: SpecFileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const readFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(JSON_EXTENSION)) {
      toast.error('Choose a .json spec file.');
      return;
    }
    if (file.size > TEST_SUITE_SPEC_MAX_BYTES) {
      toast.error('The spec must be 1 MB or smaller.');
      return;
    }
    form.setValue('specText', await file.text(), { shouldValidate: true });
    setFileName(file.name);
  };

  return (
    <>
      <Button
        type="button"
        variant="unstyled"
        size="unstyled"
        className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/30 text-sm text-muted-foreground hover:bg-muted/60"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void readFile(event.dataTransfer.files[0]);
        }}
      >
        <FileUpIcon className="size-6" />
        <span>Drop a .json spec here, or click to choose one</span>
        <span className="text-xs">Up to 1 MB</span>
        <SpecFileName fileName={fileName} />
      </Button>
      <Input
        ref={inputRef}
        type="file"
        accept={`${JSON_EXTENSION},application/json`}
        aria-label="Spec file"
        className="hidden"
        onChange={(event) => {
          void readFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
    </>
  );
}
