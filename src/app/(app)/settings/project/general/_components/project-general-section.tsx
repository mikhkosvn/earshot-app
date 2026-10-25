'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { ProjectGeneralForm } from './project-general-form';

export function ProjectGeneralSection() {
  const projectId = useCurrentProjectId();

  return <ProjectGeneralForm key={projectId} />;
}
