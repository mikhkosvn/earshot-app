'use client';

import { PlayIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

interface PlaySampleButtonProps {
  fileId: string | null;
  label: string;
}

export function PlaySampleButton({ fileId, label }: PlaySampleButtonProps) {
  if (!fileId) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={`Play preview of ${label}`}
      onClick={(event) => {
        event.stopPropagation();
        void new Audio(UrlGenerator.file({ fileId })).play();
      }}
    >
      <PlayIcon />
    </Button>
  );
}
