'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { KnowledgeForm } from './knowledge-form';

export function KnowledgeSection() {
  const projectId = useCurrentProjectId();

  return <KnowledgeForm key={projectId} />;
}
