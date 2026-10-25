'use client';

import { useIsCreatingAgent } from '../../_hooks/use-is-creating-agent';

export function CreateAgentSubmitLabel() {
  const isCreating = useIsCreatingAgent();

  if (isCreating) return 'Creating...';
  return 'Create';
}
