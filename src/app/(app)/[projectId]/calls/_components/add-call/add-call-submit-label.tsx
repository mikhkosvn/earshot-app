'use client';

import { useIsUploadingCalls } from '../../_hooks/mutations/call-ingest/use-is-uploading-calls';

export function AddCallSubmitLabel() {
  const isUploading = useIsUploadingCalls();

  if (isUploading) return 'Creating...';
  return 'Create';
}
