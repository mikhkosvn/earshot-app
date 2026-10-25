'use client';

import { useApiKeys } from '../_hooks/use-api-keys';

export function ApiKeyListEmpty() {
  const apiKeys = useApiKeys();
  if (apiKeys.length > 0) return null;

  return (
    <p className="rounded-md border border-dashed px-3 py-6 text-center text-sm text-muted-foreground">
      No API keys yet. Select Create to make one.
    </p>
  );
}
