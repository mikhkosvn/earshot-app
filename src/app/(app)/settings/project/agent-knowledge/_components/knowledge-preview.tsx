'use client';

import { useWatch } from 'react-hook-form';

import type { ProjectKnowledgeFormValues } from '@/server/project-knowledge/types';

import { MarkdownPreview } from './markdown/markdown-preview';

export function KnowledgePreview() {
  const content = useWatch<ProjectKnowledgeFormValues, 'content'>({
    name: 'content',
  });

  return (
    <div className="min-h-100 rounded-md border px-4 py-3">
      <MarkdownPreview text={content} />
    </div>
  );
}
