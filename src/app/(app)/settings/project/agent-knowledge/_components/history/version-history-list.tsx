'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { useKnowledgeVersions } from '../../_hooks/use-knowledge-versions';
import { formatVersionMeta } from '../../_utils/format-version-meta';
import { MarkdownPreview } from '../markdown/markdown-preview';

export function VersionHistoryList() {
  const versions = useKnowledgeVersions();

  if (versions.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No saved versions yet. Save the instructions to create version 1.
      </p>
    );
  }
  return (
    <Accordion>
      {versions.map((version) => (
        <AccordionItem key={version.id} value={version.id}>
          <AccordionTrigger className="items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">
                Version {version.version}
              </span>
              <span
                className="text-xs font-normal text-muted-foreground"
                suppressHydrationWarning
              >
                {formatVersionMeta(version)}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="rounded-md border px-3 py-2">
              <MarkdownPreview text={version.content} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
