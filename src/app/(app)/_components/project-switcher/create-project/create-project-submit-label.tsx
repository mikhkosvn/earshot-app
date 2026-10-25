'use client';

import { useIsCreatingProject } from '@/app/(app)/_hooks/project-switcher/use-is-creating-project';

export function CreateProjectSubmitLabel() {
  const isCreating = useIsCreatingProject();

  if (isCreating) return 'Creating...';
  return 'Create project';
}
