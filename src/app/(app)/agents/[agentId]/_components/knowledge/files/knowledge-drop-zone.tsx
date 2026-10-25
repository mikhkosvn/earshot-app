'use client';

import { UploadIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KNOWLEDGE_FILE_EXTENSIONS } from '@/server/agents/constants/agent-limits';
import { uploadKnowledgeFileSchema } from '@/server/agents/schemas';

import { useUploadKnowledgeFileMutation } from '../../../_hooks/mutations/knowledge/use-upload-knowledge-file-mutation';
import { useAgentId } from '../../../_hooks/use-agent-id';
import { firstIssueMessage } from '../../../_utils/first-issue-message';
import { UploadErrorText } from './upload-error-text';

const fileSchema = uploadKnowledgeFileSchema.shape.file;

export function KnowledgeDropZone() {
  const agentId = useAgentId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadFile = useUploadKnowledgeFileMutation();

  const uploadFiles = (files: FileList | null) => {
    setError(null);
    for (const file of Array.from(files ?? [])) {
      const parsed = fileSchema.safeParse(file);
      if (!parsed.success) {
        setError(`${file.name}: ${firstIssueMessage(parsed.error)}`);
        continue;
      }
      uploadFile.mutate({ agentId, file });
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-5 text-center text-xs text-muted-foreground"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        uploadFiles(event.dataTransfer.files);
      }}
    >
      <UploadIcon className="size-5" />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploadFile.isPending}
        onClick={() => inputRef.current?.click()}
      >
        Choose File
      </Button>
      <p>Drag and drop files here, or click to select files</p>
      <p>Supported formats: PDF, TXT, JSON, MD, CSV, XML</p>
      <UploadErrorText error={error} />
      <Input
        ref={inputRef}
        type="file"
        multiple
        accept={KNOWLEDGE_FILE_EXTENSIONS.join(',')}
        aria-label="Knowledge files"
        className="hidden"
        onChange={(event) => {
          uploadFiles(event.target.files);
          event.target.value = '';
        }}
      />
    </div>
  );
}
