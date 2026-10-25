'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { TRANSCRIPT_SOURCE_INFO } from '../_constants/metric-form-text';
import { transcriptSourceLabel } from '../_utils/transcript-source';
import { InfoTooltip } from '../info-tooltip';

type TranscriptSourceNoteProps = {
  transcriptCode: string;
};

export function TranscriptSourceNote({
  transcriptCode,
}: TranscriptSourceNoteProps) {
  const project = useCurrentProject();

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
      <code className="rounded-sm border bg-background px-1.5 py-0.5 font-sans text-[11px] text-foreground">
        {transcriptCode}
      </code>
      <span>
        currently resolves to the{' '}
        <strong className="font-medium text-foreground">
          {transcriptSourceLabel(project.useProviderTranscript)}
        </strong>{' '}
        for this project.
      </span>
      <InfoTooltip
        label="About transcript sources"
        text={TRANSCRIPT_SOURCE_INFO}
      />
      <Link
        href={UrlGenerator.settingsProjectGeneral()}
        className="inline-flex items-center gap-0.5 text-blue-600 hover:underline dark:text-blue-400"
      >
        Change in project settings
        <ArrowUpRightIcon className="size-3" />
      </Link>
    </div>
  );
}
