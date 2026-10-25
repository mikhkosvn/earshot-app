'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { ProviderKeysForm } from './provider-keys-form';

export function ProviderKeysSection() {
  const projectId = useCurrentProjectId();

  return <ProviderKeysForm key={projectId} />;
}
